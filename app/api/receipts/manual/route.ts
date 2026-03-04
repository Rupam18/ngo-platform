import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import PDFDocument from "pdfkit";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const generateReceiptNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000);
    return `RISO-${year}-${random}`;
};

export async function POST(req: Request) {
    try {
        const { donorId, amount, paymentMethod } = await req.json();

        if (!donorId || !amount) {
            return NextResponse.json({ success: false, message: "Donor ID and Amount are required." }, { status: 400 });
        }

        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(donorId)) {
            return NextResponse.json({ success: false, message: "Invalid Donor ID format. Must be a valid UUID." }, { status: 400 });
        }

        const donor = await prisma.donor.findUnique({
            where: { id: donorId }
        });

        if (!donor) {
            return NextResponse.json({ success: false, message: "Donor not found." }, { status: 404 });
        }

        const receiptNumber = generateReceiptNumber();

        const donation = await prisma.donation.create({
            data: {
                donorId,
                amount: Number(amount),
                paymentMethod,
                receiptNumber,
                type: "MANUAL"
            }
        });

        // Generate PDF in memory
        const pdfBuffer = await new Promise<Buffer>((resolve) => {
            const doc = new PDFDocument();
            const buffers: Buffer[] = [];

            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => {
                resolve(Buffer.concat(buffers));
            });

            doc.fontSize(20).text("Donation Receipt", { align: "center" });
            doc.moveDown();
            doc.fontSize(12).text(`Receipt Number: ${donation.receiptNumber}`);
            doc.text(`Date: ${new Date().toDateString()}`);
            doc.moveDown();
            doc.text(`Donor Name: ${donor.name}`);
            doc.text(`Email: ${donor.email}`);
            doc.text(`PAN: ${donor.pan || "N/A"}`);
            doc.moveDown();
            doc.text(`Donation Amount: Rs. ${donation.amount}`);
            doc.text(`Payment Method: ${donation.paymentMethod}`);
            doc.moveDown();
            doc.text("Thank you for supporting our mission.");
            doc.end();
        });

        // Upload PDF Buffer to Cloudinary
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "ngo-receipts", format: "pdf" },
                (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                }
            );
            uploadStream.end(pdfBuffer);
        });

        const receiptUrl = uploadResult.secure_url;

        const updatedDonation = await prisma.donation.update({
            where: { id: donation.id },
            data: { receiptUrl }
        });

        return NextResponse.json({
            success: true,
            message: "Manual receipt generated",
            data: {
                donation: updatedDonation,
                receiptUrl
            }
        });

    } catch (error: any) {
        console.error("Manual Receipt Generation Error:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

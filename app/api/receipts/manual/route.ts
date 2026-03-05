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

        // Generate PDF in memory using jsPDF
        // Note: Using dynamic import or require to ensure it works nicely in the serverless edge/node environment
        const { jsPDF } = require("jspdf");
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Donation Receipt", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Receipt Number: ${donation.receiptNumber}`, 20, 40);
        doc.text(`Date: ${new Date().toDateString()}`, 20, 50);

        doc.text(`Donor Name: ${donor.name}`, 20, 70);
        doc.text(`Email: ${donor.email}`, 20, 80);
        doc.text(`PAN: ${donor.pan || "N/A"}`, 20, 90);

        doc.text(`Donation Amount: Rs. ${donation.amount}`, 20, 110);
        doc.text(`Payment Method: ${donation.paymentMethod}`, 20, 120);

        doc.text("Thank you for supporting our mission.", 20, 140);

        const pdfBase64String = doc.output('datauristring');

        // Remove the Data URI prefix so cloudinary can upload it clearly
        // ex: 'data:application/pdf;filename=generated.pdf;base64,...'

        // Upload PDF Buffer to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(pdfBase64String, {
            folder: "ngo-receipts",
            resource_type: "raw", // Required for raw files like PDF vs image
            format: "pdf"
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

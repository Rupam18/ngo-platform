import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateReceiptPDF = async (donation: any, donor: any) => {
    const fileName = `receipt-${donation.receiptNumber}.pdf`;
    const filePath = path.join(__dirname, "../../uploads", fileName);

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Donation Receipt", { align: "center" });

    doc.moveDown();

    doc.fontSize(12).text(`Receipt Number: ${donation.receiptNumber}`);
    doc.text(`Date: ${new Date().toDateString()}`);

    doc.moveDown();

    doc.text(`Donor Name: ${donor.name}`);
    doc.text(`Email: ${donor.email}`);
    doc.text(`PAN: ${donor.pan || "N/A"}`);

    doc.moveDown();

    doc.text(`Donation Amount: rs${donation.amount}`);
    doc.text(`Payment Method: ${donation.paymentMethod}`);

    doc.moveDown();

    doc.text("Thank you for supporting our mission.");

    doc.end();

    return fileName;
};

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generate80GPdf = async (
    receiptNumber: string,
    donorName: string,
    donorPAN: string | null,
    donorAddress: string | null,
    amount: number,
    donationDate: Date,
    paymentMethod: string | null
): Promise<string> => {
    const fileName = `80G-${receiptNumber}.pdf`;
    const uploadDir = path.join(__dirname, '../../../../uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);

    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // NGO Header
    doc.fontSize(24).text("RISO NGO Platform", { align: "center" });
    doc.fontSize(12).text("123 Giving Street, City, State - 100001", { align: "center" });
    doc.moveDown();

    doc.fontSize(10).text("NGO PAN: XXXXX0000X", { align: "center" });
    doc.text("80G Registration Number: 123456789", { align: "center" });
    doc.text("Validity period: AY 2024-25 onwards", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).text("DONATION RECEIPT (Section 80G)", { align: "center", underline: true });
    doc.moveDown(2);

    // Receipt details
    doc.fontSize(12).text(`Receipt Number: ${receiptNumber}`);
    doc.text(`Date of Receipt: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Donor details
    doc.text("Received with thanks from:");
    doc.text(`Name: ${donorName}`);
    if (donorPAN) doc.text(`PAN: ${donorPAN}`);
    if (donorAddress) doc.text(`Address: ${donorAddress}`);
    doc.moveDown();

    // Donation details
    doc.text(`A sum of Rupees: ₹${amount}`);
    doc.text(`Date of Donation: ${donationDate.toLocaleDateString()}`);
    if (paymentMethod) doc.text(`Payment Mode: ${paymentMethod}`);
    doc.moveDown(2);

    // Statement
    doc.font('Helvetica-Bold').text(
        "This donation qualifies for deduction under Section 80G of the Income Tax Act, 1961.",
        { align: "center" }
    );
    doc.font('Helvetica');
    doc.moveDown(4);

    // Signature
    doc.text("For RISO NGO Platform", { align: "right" });
    doc.moveDown(2);
    doc.text("Authorized Signatory", { align: "right" });

    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};

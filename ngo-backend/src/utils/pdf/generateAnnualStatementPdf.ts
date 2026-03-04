import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateAnnualStatementPdf = async (statementData: any): Promise<string> => {
    const fileName = `Annual-Tax-Statement-${statementData.donorName.replace(/\\s+/g, '-')}-${statementData.financialYear}.pdf`;
    const uploadDir = path.join(__dirname, '../../../../uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);

    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(24).text("RISO NGO Platform", { align: "center" });
    doc.fontSize(12).text("123 Giving Street, City, State - 100001", { align: "center" });
    doc.moveDown();

    doc.fontSize(10).text("NGO PAN: XXXXX0000X", { align: "center" });
    doc.text("80G Registration Number: 123456789", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).text(`ANNUAL TAX STATEMENT (FY ${statementData.financialYear})`, { align: "center", underline: true });
    doc.moveDown(2);

    // Donor Details
    doc.fontSize(12).text(`Donor Name: ${statementData.donorName}`);
    if (statementData.donorPAN) doc.text(`PAN: ${statementData.donorPAN}`);
    if (statementData.donorEmail) doc.text(`Email: ${statementData.donorEmail}`);
    doc.moveDown();

    // Summary Table Header
    doc.font('Helvetica-Bold').text('Donation Summary:', { underline: true });
    doc.moveDown(0.5);
    doc.text(`Total Donations Eligible under 80G: ₹${statementData.totalDonations}`);
    doc.moveDown(2);

    // Donations Table Header
    const tableTop = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Date', 50, tableTop);
    doc.text('Amount', 150, tableTop);
    doc.text('Payment Mode', 250, tableTop);
    doc.text('80G Receipt No.', 400, tableTop);
    doc.moveDown();

    // Donations Table Body
    doc.font('Helvetica');
    let yPosition = doc.y;
    for (const donation of statementData.donations) {
        if (yPosition > 700) {
            doc.addPage();
            yPosition = 50; // reset y
        }
        doc.text(donation.date.toLocaleDateString(), 50, yPosition);
        doc.text(`₹${donation.amount}`, 150, yPosition);
        doc.text(donation.paymentMethod || 'N/A', 250, yPosition);
        doc.text(donation.receiptNumber || 'Pending', 400, yPosition);
        yPosition += 20;
    }
    doc.moveDown(3);

    // Footer / Signature
    // Update Y to avoid page break logic if close to bottom
    if (doc.y > 650) {
        doc.addPage();
    }
    doc.y = Math.max(doc.y, yPosition + 40);

    doc.font('Helvetica-Bold').text(
        "This statement is computer generated and summarizes your eligible donations under Section 80G.",
        50, doc.y, { align: "center" }
    );
    doc.font('Helvetica');
    doc.moveDown(4);

    doc.text("For RISO NGO Platform", 50, doc.y, { align: "right" });
    doc.moveDown(2);
    doc.text("Authorized Signatory", 50, doc.y, { align: "right" });

    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};

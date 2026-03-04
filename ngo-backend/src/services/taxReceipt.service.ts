import { prisma } from '../config/prisma';
import { generateTaxReceiptNumber } from '../utils/taxReceiptNumber';
import { generate80GPdf } from '../utils/pdf/generate80GPdf';
import { uploadPDFToCloudinary } from './cloudinary.service';

export const generate80GReceiptService = async (donationId: string) => {
    // 1. Fetch donation and donor details
    const donation = await prisma.donation.findUnique({
        where: { id: donationId },
        include: { donor: true, user: true }
    });

    if (!donation) {
        throw new Error('Donation not found');
    }

    // Check if receipt already exists
    const existingReceipt = await prisma.taxReceipt.findUnique({
        where: { donationId }
    });

    if (existingReceipt) {
        throw new Error('Tax receipt already generated for this donation');
    }

    const donorName = donation.donor?.name || donation.user?.name || 'Anonymous';
    const donorPAN = donation.donor?.pan || null;
    const donorAddress = "Address not provided"; // Or add to donor model

    // 2. Generate receipt number
    const receiptNumber = await generateTaxReceiptNumber();

    // 3. Generate PDF
    const pdfPath = await generate80GPdf(
        receiptNumber,
        donorName,
        donorPAN,
        donorAddress,
        donation.amount,
        donation.createdAt,
        donation.paymentMethod
    );

    // 4. Upload PDF to Cloudinary
    const pdfUrl = await uploadPDFToCloudinary(pdfPath, `tax_receipt_${receiptNumber}`);

    // 5. Save TaxReceipt record
    const taxReceipt = await prisma.taxReceipt.create({
        data: {
            receiptNumber,
            donationId,
            donorName,
            donorPAN,
            donorAddress,
            amount: donation.amount,
            donationDate: donation.createdAt,
            pdfUrl
        }
    });

    return taxReceipt;
};

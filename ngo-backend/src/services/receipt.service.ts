import { prisma } from "../config/prisma";
import { generateReceiptNumber } from "../utils/receiptNumber";
import { generateReceiptPDF } from "./pdf.service";

export const createManualReceiptService = async (data: any) => {
    const { donorId, amount, paymentMethod } = data;

    const donor = await prisma.donor.findUnique({
        where: { id: donorId }
    });

    if (!donor) {
        throw new Error("Donor not found");
    }

    const receiptNumber = generateReceiptNumber();

    const donation = await prisma.donation.create({
        data: {
            donorId,
            amount,
            paymentMethod,
            receiptNumber,
            type: "MANUAL"
        }
    });

    const fileName = await generateReceiptPDF(donation, donor);

    const receiptUrl = `/uploads/${fileName}`;

    await prisma.donation.update({
        where: { id: donation.id },
        data: { receiptUrl }
    });

    return {
        donation,
        receiptUrl
    };
};

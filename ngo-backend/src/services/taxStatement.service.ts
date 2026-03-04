import { prisma } from "../config/prisma";
import { getFinancialYearRange } from "../utils/financialYear";
import { generateAnnualStatementPdf } from "../utils/pdf/generateAnnualStatementPdf";

export const generateAnnualTaxStatementService = async (
    donorId: string,
    financialYear: number,
    generatePdf: boolean = false
) => {
    const { start, end } = getFinancialYearRange(financialYear);

    // Use either donorId (manual donor) or userId (registered user)
    // Let's check both possibilities.
    const donor = await prisma.donor.findUnique({ where: { id: donorId } });
    const user = !donor ? await prisma.user.findUnique({ where: { id: donorId } }) : null;

    if (!donor && !user) {
        throw new Error('Donor/User not found');
    }

    const queryCriteria = donor ? { donorId } : { userId: donorId };

    const donations = await prisma.donation.findMany({
        where: {
            ...queryCriteria,
            createdAt: {
                gte: start,
                lte: end
            },
            status: "SUCCESS" // Only successful donations eligible for 80G
        },
        include: {
            taxReceipt: true // Include individual tax receipts if generated
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    const totalAmount = donations.reduce(
        (sum, donation) => sum + donation.amount,
        0
    );

    const statementData = {
        financialYear: `${financialYear}-${financialYear + 1}`,
        donorName: donor?.name || user?.name || "Unknown",
        donorPAN: donor?.pan || "Not Provided",
        donorEmail: donor?.email || user?.email || "",
        totalDonations: totalAmount,
        donations: donations.map(d => ({
            donationId: d.id,
            amount: d.amount,
            date: d.createdAt,
            paymentMethod: d.paymentMethod,
            receiptNumber: d.taxReceipt?.receiptNumber || "Pending"
        }))
    };

    let pdfUrl = null;
    if (generatePdf) {
        pdfUrl = await generateAnnualStatementPdf(statementData);
    }

    return {
        ...statementData,
        pdfUrl
    };
};

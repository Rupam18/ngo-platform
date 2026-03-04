import { prisma } from '../config/prisma';

export const generateTaxReceiptNumber = async (): Promise<string> => {
    const currentYear = new Date().getFullYear();

    // Find the count of receipts generated this year
    const count = await prisma.taxReceipt.count({
        where: {
            // Assuming receipts belong to the same year
            generatedAt: {
                gte: new Date(`${currentYear}-01-01`),
                lt: new Date(`${currentYear + 1}-01-01`),
            }
        }
    });

    const nextNumber = (count + 1).toString().padStart(4, '0');

    return `RISO-80G-${currentYear}-${nextNumber}`;
};

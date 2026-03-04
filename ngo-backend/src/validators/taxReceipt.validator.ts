import { z } from "zod";

export const generateTaxReceiptSchema = z.object({
    params: z.object({
        donationId: z.string().uuid({ message: "Invalid Donation ID format" }),
    }),
});

export const getTaxReceiptSchema = z.object({
    params: z.object({
        receiptId: z.string().uuid({ message: "Invalid Receipt ID format" }),
    }),
});

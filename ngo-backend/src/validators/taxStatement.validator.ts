import { z } from "zod";

export const getAnnualStatementSchema = z.object({
    params: z.object({
        donorId: z.string().uuid({ message: "Invalid Donor ID format" }),
    }),
    query: z.object({
        year: z.string().regex(/^\\d{4}$/, "Year must be a 4-digit number (e.g., 2025)"),
        pdf: z.enum(["true", "false"]).optional(),
    })
});

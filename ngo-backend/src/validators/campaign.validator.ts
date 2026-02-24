import { z } from "zod";

export const createCampaignSchema = z.object({
    body: z.object({
        title: z.string()
            .min(5, "Title must be at least 5 characters")
            .trim(),
        goal: z.number()
            .positive("Goal must be a positive number"),
        status: z.enum(["ACTIVE", "COMPLETED", "Archived", "Draft"]).optional(),
    }),
});

export const updateCampaignSchema = z.object({
    body: z.object({
        title: z.string().min(5, "Title must be at least 5 characters").trim().optional(),
        goal: z.number().positive("Goal must be a positive number").optional(),
        status: z.enum(["ACTIVE", "COMPLETED", "Archived", "Draft"]).optional(),
    }),
});

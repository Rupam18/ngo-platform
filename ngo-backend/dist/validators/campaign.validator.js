"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCampaignSchema = exports.createCampaignSchema = void 0;
const zod_1 = require("zod");
exports.createCampaignSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string()
            .min(5, "Title must be at least 5 characters")
            .trim(),
        goal: zod_1.z.number()
            .positive("Goal must be a positive number"),
        status: zod_1.z.enum(["ACTIVE", "COMPLETED", "Archived", "Draft"]).optional(),
    }),
});
exports.updateCampaignSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5, "Title must be at least 5 characters").trim().optional(),
        goal: zod_1.z.number().positive("Goal must be a positive number").optional(),
        status: zod_1.z.enum(["ACTIVE", "COMPLETED", "Archived", "Draft"]).optional(),
    }),
});

import express from "express";
import { generateTaxReceipt, getTaxReceipt } from "../controllers/taxReceipt.controller";
import { validate } from "../middleware/validate.middleware";
import { generateTaxReceiptSchema, getTaxReceiptSchema } from "../validators/taxReceipt.validator";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

// Generate a new 80G certificate
router.post(
    "/generate/:donationId",
    protect, // Ensure only authorized users/admins can generate
    validate(generateTaxReceiptSchema),
    generateTaxReceipt
);

// Download/View an existing 80G certificate
router.get(
    "/:receiptId",
    protect,
    validate(getTaxReceiptSchema),
    getTaxReceipt
);

export default router;

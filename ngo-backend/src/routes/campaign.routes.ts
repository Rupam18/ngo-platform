import express from "express";
import {
    createCampaign,
    getCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
} from "../controllers/campaign.controller";
import { protect } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/role.middleware";
import { upload } from "../config/cloudinary";

const router = express.Router();

// Public Routes
router.get("/", getCampaigns);
router.get("/:id", getCampaignById);

// Admin Routes
router.post("/", protect, adminOnly, upload.single("image"), createCampaign);
router.put("/:id", protect, adminOnly, upload.single("image"), updateCampaign);
router.delete("/:id", protect, adminOnly, deleteCampaign);

export default router;

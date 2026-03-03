"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campaign_controller_1 = require("../controllers/campaign.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const cloudinary_1 = require("../config/cloudinary");
const router = express_1.default.Router();
// Public Routes
router.get("/", campaign_controller_1.getCampaigns);
router.get("/:id", campaign_controller_1.getCampaignById);
// Admin Routes
router.post("/", auth_middleware_1.protect, role_middleware_1.adminOnly, cloudinary_1.upload.single("image"), campaign_controller_1.createCampaign);
router.put("/:id", auth_middleware_1.protect, role_middleware_1.adminOnly, cloudinary_1.upload.single("image"), campaign_controller_1.updateCampaign);
router.delete("/:id", auth_middleware_1.protect, role_middleware_1.adminOnly, campaign_controller_1.deleteCampaign);
// Upload up to 5 images to an existing campaign
router.post("/:id/images", auth_middleware_1.protect, role_middleware_1.adminOnly, cloudinary_1.uploadMultiple.array("images", 5), campaign_controller_1.uploadCampaignImages);
exports.default = router;

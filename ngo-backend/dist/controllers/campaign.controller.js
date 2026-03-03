"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCampaignImages = exports.deleteCampaign = exports.updateCampaign = exports.getCampaignById = exports.getCampaigns = exports.createCampaign = void 0;
const prisma_1 = require("../config/prisma");
const cloudinary_1 = require("../config/cloudinary");
// POST /api/campaign -> Create campaign (ADMIN only)
const createCampaign = async (req, res) => {
    try {
        const { title, goal, status } = req.body;
        const coverImage = req.file ? req.file.path : undefined;
        if (!title || typeof title !== "string") {
            return res.status(400).json({ success: false, message: "Valid title is required" });
        }
        const goalAmount = Number(goal);
        if (isNaN(goalAmount) || goalAmount <= 0) {
            return res.status(400).json({ success: false, message: "Goal must be a positive number" });
        }
        const campaign = await prisma_1.prisma.campaign.create({
            data: {
                title,
                goal: goalAmount,
                status: status || "ACTIVE",
                ...(coverImage && { coverImage })
            }
        });
        return res.status(201).json({ success: true, data: campaign });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.createCampaign = createCampaign;
// GET /api/campaign -> Get all campaigns (Public)
const getCampaigns = async (req, res) => {
    try {
        const campaigns = await prisma_1.prisma.campaign.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { donations: true }
                }
            }
        });
        return res.status(200).json({ success: true, data: campaigns });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.getCampaigns = getCampaigns;
// GET /api/campaign/:id -> Get single campaign by ID (Public)
const getCampaignById = async (req, res) => {
    try {
        const id = req.params.id;
        const campaign = await prisma_1.prisma.campaign.findUnique({
            where: { id },
            include: {
                donations: {
                    where: { status: "SUCCESS" },
                    orderBy: { createdAt: "desc" },
                    take: 10,
                    include: {
                        user: {
                            select: { name: true }
                        }
                    }
                },
                _count: {
                    select: { donations: true }
                }
            }
        });
        if (!campaign) {
            return res.status(404).json({ success: false, message: "Campaign not found" });
        }
        return res.status(200).json({ success: true, data: campaign });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.getCampaignById = getCampaignById;
// PUT /api/campaign/:id -> Update campaign (ADMIN only)
const updateCampaign = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, goal, status } = req.body;
        const campaign = await prisma_1.prisma.campaign.findUnique({
            where: { id },
            include: {
                donations: {
                    where: { status: "SUCCESS" }
                }
            }
        });
        if (!campaign) {
            return res.status(404).json({ success: false, message: "Campaign not found" });
        }
        if (goal !== undefined) {
            if (typeof goal !== "number" || goal <= 0) {
                return res.status(400).json({ success: false, message: "Goal must be a positive number" });
            }
        }
        // Prevent manually setting to COMPLETED if total raised < goal
        if (status === "COMPLETED") {
            const currentGoal = goal !== undefined ? goal : campaign.goal;
            const totalRaised = campaign.donations.reduce((sum, d) => sum + d.amount, 0);
            if (totalRaised < currentGoal) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot mark as COMPLETED: Total donations have not reached the goal"
                });
            }
        }
        const updatedCampaign = await prisma_1.prisma.campaign.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(goal !== undefined && { goal: Number(goal) }),
                ...(status && { status }),
                ...(req.file && { coverImage: req.file.path })
            }
        });
        return res.status(200).json({ success: true, data: updatedCampaign });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.updateCampaign = updateCampaign;
// DELETE /api/campaign/:id -> Delete campaign (ADMIN only)
const deleteCampaign = async (req, res) => {
    try {
        const id = req.params.id;
        const campaign = await prisma_1.prisma.campaign.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { donations: true }
                }
            }
        });
        if (!campaign) {
            return res.status(404).json({ success: false, message: "Campaign not found" });
        }
        // Prevent deletion if donations exist
        if (campaign._count.donations > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete campaign with existing donations"
            });
        }
        await prisma_1.prisma.campaign.delete({
            where: { id }
        });
        return res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.deleteCampaign = deleteCampaign;
// POST /api/campaign/:id/images -> Upload multiple images (ADMIN only)
const uploadCampaignImages = async (req, res) => {
    try {
        const campaignId = req.params.id;
        // 1. Check if campaign exists
        const campaign = await prisma_1.prisma.campaign.findUnique({ where: { id: campaignId } });
        if (!campaign) {
            return res.status(404).json({ success: false, message: "Campaign not found" });
        }
        // 2. Validate files
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images provided" });
        }
        const files = req.files;
        // 3. Upload all files to Cloudinary concurrently
        const uploadPromises = files.map(file => (0, cloudinary_1.uploadToCloudinary)(file.buffer, 'ngo_campaigns'));
        const cloudinaryResults = await Promise.all(uploadPromises);
        // 4. Save results to PostgreSQL mapping (CampaignImage table)
        const imageRecords = cloudinaryResults.map(result => ({
            campaignId: campaignId,
            imageUrl: result.secure_url,
            publicId: result.public_id
        }));
        await prisma_1.prisma.campaignImage.createMany({
            data: imageRecords
        });
        // 5. Return JSON response
        const savedImages = await prisma_1.prisma.campaignImage.findMany({
            where: { campaignId }
        });
        return res.status(200).json({
            success: true,
            message: "Images uploaded successfully",
            data: savedImages
        });
    }
    catch (error) {
        console.error("Error uploading images:", error);
        return res.status(500).json({ success: false, message: error.message || "Failed to upload images" });
    }
};
exports.uploadCampaignImages = uploadCampaignImages;

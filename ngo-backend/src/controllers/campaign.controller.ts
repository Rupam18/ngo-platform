import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// POST /api/campaign -> Create campaign (ADMIN only)
export const createCampaign = async (req: Request, res: Response): Promise<any> => {
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

        const campaign = await prisma.campaign.create({
            data: {
                title,
                goal: goalAmount,
                status: status || "ACTIVE",
                ...(coverImage && { coverImage })
            }
        });

        return res.status(201).json({ success: true, data: campaign });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};

// GET /api/campaign -> Get all campaigns (Public)
export const getCampaigns = async (req: Request, res: Response): Promise<any> => {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { donations: true }
                }
            }
        });

        return res.status(200).json({ success: true, data: campaigns });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};

// GET /api/campaign/:id -> Get single campaign by ID (Public)
export const getCampaignById = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;

        const campaign = await prisma.campaign.findUnique({
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
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};

// PUT /api/campaign/:id -> Update campaign (ADMIN only)
export const updateCampaign = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const { title, goal, status } = req.body;

        const campaign: any = await prisma.campaign.findUnique({
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
            const totalRaised = campaign.donations.reduce((sum: number, d: any) => sum + d.amount, 0);

            if (totalRaised < currentGoal) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot mark as COMPLETED: Total donations have not reached the goal"
                });
            }
        }

        const updatedCampaign = await prisma.campaign.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(goal !== undefined && { goal: Number(goal) }),
                ...(status && { status }),
                ...(req.file && { coverImage: req.file.path })
            }
        });

        return res.status(200).json({ success: true, data: updatedCampaign });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};

// DELETE /api/campaign/:id -> Delete campaign (ADMIN only)
export const deleteCampaign = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;

        const campaign: any = await prisma.campaign.findUnique({
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

        await prisma.campaign.delete({
            where: { id }
        });

        return res.status(200).json({ success: true, data: {} });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};

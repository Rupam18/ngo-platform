"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = require("../config/prisma");
const getDashboardStats = async (req, res) => {
    try {
        // Run queries in parallel
        const [totalRaised, totalDonors, activeCampaigns, completedCampaigns, recentDonations] = await Promise.all([
            prisma_1.prisma.donation.aggregate({
                where: { status: "SUCCESS" },
                _sum: { amount: true }
            }),
            prisma_1.prisma.user.count(),
            prisma_1.prisma.campaign.count({
                where: { status: "ACTIVE" }
            }),
            prisma_1.prisma.campaign.count({
                where: { status: "COMPLETED" }
            }),
            prisma_1.prisma.donation.findMany({
                where: { status: "SUCCESS" },
                orderBy: { createdAt: "desc" },
                take: 5,
                include: {
                    user: { select: { name: true } },
                    campaign: { select: { title: true } }
                }
            })
        ]);
        // Monthly Growth Calculation
        const now = new Date();
        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const [thisMonth, lastMonth] = await Promise.all([
            prisma_1.prisma.donation.aggregate({
                where: {
                    status: "SUCCESS",
                    createdAt: { gte: firstDayThisMonth }
                },
                _sum: { amount: true }
            }),
            prisma_1.prisma.donation.aggregate({
                where: {
                    status: "SUCCESS",
                    createdAt: {
                        gte: firstDayLastMonth,
                        lt: firstDayThisMonth
                    }
                },
                _sum: { amount: true }
            })
        ]);
        const current = thisMonth._sum.amount || 0;
        const previous = lastMonth._sum.amount || 0;
        const monthlyGrowth = previous === 0
            ? 100
            : ((current - previous) / previous) * 100;
        return res.json({
            totalRaised: totalRaised._sum.amount || 0,
            totalDonors,
            activeCampaigns,
            completedCampaigns,
            monthlyGrowth: monthlyGrowth.toFixed(2),
            recentDonations
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Dashboard error", error });
    }
};
exports.getDashboardStats = getDashboardStats;

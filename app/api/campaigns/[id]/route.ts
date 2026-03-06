import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/campaigns/[id] -> Get single campaign
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const campaign = await prisma.campaign.findUnique({
            where: { id },
            include: {
                donations: {
                    where: { status: "SUCCESS" },
                    orderBy: { createdAt: "desc" },
                    take: 10,
                    include: {
                        user: { select: { name: true } }
                    }
                },
                _count: {
                    select: { donations: true }
                }
            }
        });

        if (!campaign) {
            return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: campaign });
    } catch (error) {
        console.error("Error fetching campaign:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: String(error) },
            { status: 500 }
        );
    }
}

// PATCH /api/campaigns/[id] -> Update campaign
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, goal, status, coverImage } = body;

        const campaign = await prisma.campaign.findUnique({
            where: { id },
            include: { donations: { where: { status: "SUCCESS" } } }
        });

        if (!campaign) {
            return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 404 });
        }

        if (goal !== undefined) {
            if (typeof goal !== "number" || goal <= 0) {
                return NextResponse.json({ success: false, message: "Goal must be a positive number" }, { status: 400 });
            }
        }

        if (status === "COMPLETED") {
            const currentGoal = goal !== undefined ? goal : campaign.goal;
            const totalRaised = campaign.donations.reduce((sum: number, d: { amount: number }) => sum + d.amount, 0);

            if (totalRaised < currentGoal) {
                return NextResponse.json({
                    success: false,
                    message: "Cannot mark as COMPLETED: Total donations have not reached the goal"
                }, { status: 400 });
            }
        }

        const updatedCampaign = await prisma.campaign.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(goal !== undefined && { goal: Number(goal) }),
                ...(status && { status }),
                ...(coverImage && { coverImage })
            }
        });

        return NextResponse.json({ success: true, data: updatedCampaign });
    } catch (error) {
        console.error("Error updating campaign:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: String(error) },
            { status: 500 }
        );
    }
}

// DELETE /api/campaigns/[id] -> Delete campaign
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const campaign = await prisma.campaign.findUnique({
            where: { id },
            include: {
                _count: { select: { donations: true } }
            }
        });

        if (!campaign) {
            return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 404 });
        }

        if (campaign._count.donations > 0) {
            return NextResponse.json({
                success: false,
                message: "Cannot delete campaign with existing donations"
            }, { status: 400 });
        }

        await prisma.campaign.delete({ where: { id } });

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error("Error deleting campaign:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: String(error) },
            { status: 500 }
        );
    }
}

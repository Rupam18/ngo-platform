import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/campaigns -> Get all campaigns
export async function GET() {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { donations: true }
                }
            }
        });

        return NextResponse.json({ success: true, data: campaigns });
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: String(error) },
            { status: 500 }
        );
    }
}

// POST /api/campaigns -> Create a new campaign (Admin usually)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, goal, status, coverImage } = body;

        if (!title || typeof title !== "string") {
            return NextResponse.json({ success: false, message: "Valid title is required" }, { status: 400 });
        }

        const goalAmount = Number(goal);
        if (isNaN(goalAmount) || goalAmount <= 0) {
            return NextResponse.json({ success: false, message: "Goal must be a positive number" }, { status: 400 });
        }

        const campaign = await prisma.campaign.create({
            data: {
                title,
                goal: goalAmount,
                status: status || "ACTIVE",
                ...(coverImage && { coverImage })
            }
        });

        return NextResponse.json({ success: true, data: campaign }, { status: 201 });
    } catch (error) {
        console.error("Error creating campaign:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: String(error) },
            { status: 500 }
        );
    }
}

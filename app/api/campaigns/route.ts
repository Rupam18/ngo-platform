import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { isAdmin } from "../../../lib/auth";

export async function GET() {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(campaigns);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!(await isAdmin(req))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { title, description, image, goalAmount } = body;

        // Basic validation
        if (!title || !description || !image || !goalAmount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const campaign = await prisma.campaign.create({
            data: {
                title,
                description,
                image,
                goalAmount: parseFloat(goalAmount),
                raisedAmount: 0,
            },
        });

        return NextResponse.json(campaign, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
    }
}

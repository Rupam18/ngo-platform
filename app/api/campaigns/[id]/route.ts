import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { isAdmin } from "../../../../lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const campaign = await prisma.campaign.findUnique({
            where: { id },
        });
        if (!campaign) {
            return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
        }
        return NextResponse.json(campaign);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdmin(req))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { id } = await params;
        const body = await req.json();
        const { title, description, image, goalAmount } = body;

        const campaign = await prisma.campaign.update({
            where: { id },
            data: {
                title,
                description,
                image,
                goalAmount: parseFloat(goalAmount),
            },
        });

        return NextResponse.json(campaign);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdmin(req))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { id } = await params;
        await prisma.campaign.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Campaign deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
    }
}

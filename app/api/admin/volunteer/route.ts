import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const applications = await prisma.volunteerApplication.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ success: true, data: applications });
    } catch (error) {
        console.error("Error fetching volunteer applications:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch applications" },
            { status: 500 }
        );
    }
}

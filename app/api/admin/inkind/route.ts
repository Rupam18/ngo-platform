import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const inKindDonations = await prisma.inKindDonation.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            data: inKindDonations
        });
    } catch (error) {
        console.error("Error fetching in-kind donations:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch in-kind donations"
        }, { status: 500 });
    }
}

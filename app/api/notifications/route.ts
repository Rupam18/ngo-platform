import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/notifications - Fetch latest 20 unread notifications
export async function GET() {
    try {
        const notifications = await prisma.notification.findMany({
            where: { isRead: false },
            orderBy: { createdAt: "desc" },
            take: 20
        });

        return NextResponse.json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch notifications"
        }, { status: 500 });
    }
}

// PATCH /api/notifications - Mark all as read
export async function PATCH() {
    try {
        await prisma.notification.updateMany({
            where: { isRead: false },
            data: { isRead: true }
        });

        return NextResponse.json({
            success: true,
            message: "All notifications marked as read"
        });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to update notifications"
        }, { status: 500 });
    }
}

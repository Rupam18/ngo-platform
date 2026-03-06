import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/notifications/[id] - Mark a specific notification as read
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: notificationId } = await params;

        const updatedNotification = await prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true }
        });

        return NextResponse.json({
            success: true,
            data: updatedNotification
        });
    } catch (error) {
        console.error("Error updating notification:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to update notification"
        }, { status: 500 });
    }
}

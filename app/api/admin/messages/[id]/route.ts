import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await request.json();

        const updatedMessage = await prisma.contactMessage.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json({ success: true, data: updatedMessage });
    } catch (error) {
        console.error("Error updating message:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update message" },
            { status: 500 }
        );
    }
}

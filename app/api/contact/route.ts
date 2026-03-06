import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import z from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = contactSchema.parse(body);

        // Save to database
        const newContactMessage = await prisma.contactMessage.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone || null,
                subject: validatedData.subject || null,
                message: validatedData.message,
                status: "UNREAD"
            }
        });

        await prisma.notification.create({
            data: {
                title: "New Contact Message",
                message: `${validatedData.name} (${validatedData.email}) sent a message.`,
                type: "CONTACT"
            }
        });

        return NextResponse.json({
            success: true,
            message: "Message received successfully",
            data: newContactMessage
        }, { status: 201 });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                details: (error as any).errors
            }, { status: 400 });
        }

        console.error("Error saving contact message:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to process message"
        }, { status: 500 });
    }
}

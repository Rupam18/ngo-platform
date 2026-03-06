import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma Client instance
import { z } from "zod";

const inKindSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Enter valid email"),
    phone: z.string().min(10, "Enter valid 10-digit number"),
    address: z.string().min(10, "Pickup address is required"),
    subject: z.string().min(1, "Please select donation purpose"),
    clothes: z.number().int().min(0).optional().default(0),
    books: z.number().int().min(0).optional().default(0),
    raddi: z.number().int().min(0).optional().default(0),
    grains: z.number().int().min(0).optional().default(0),
    stationery: z.number().int().min(0).optional().default(0),
    computers: z.number().int().min(0).optional().default(0),
    otherItems: z.string().optional(),
    message: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = inKindSchema.parse(body);

        // Calculate total items to ensure at least one is provided
        const totalItems =
            validatedData.clothes +
            validatedData.books +
            validatedData.raddi +
            validatedData.grains +
            validatedData.stationery +
            validatedData.computers +
            (validatedData.otherItems?.trim()?.length ? 1 : 0);

        if (totalItems === 0) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                details: [{ message: "Please add at least one donation item", path: ["clothes"] }]
            }, { status: 400 });
        }

        // Save to database
        const newInKindDonation = await prisma.inKindDonation.create({
            data: {
                firstName: validatedData.firstName,
                lastName: validatedData.lastName || null,
                email: validatedData.email,
                phone: validatedData.phone,
                address: validatedData.address,
                subject: validatedData.subject,
                clothes: validatedData.clothes,
                books: validatedData.books,
                raddi: validatedData.raddi,
                grains: validatedData.grains,
                stationery: validatedData.stationery,
                computers: validatedData.computers,
                otherItems: validatedData.otherItems || null,
                message: validatedData.message || null,
                status: "PENDING"
            }
        });

        // Add a notification for admins
        await prisma.notification.create({
            data: {
                title: "New In-Kind Donation",
                message: `${validatedData.firstName} submitted an in-kind donation request.`,
                type: "DONATION"
            }
        });

        return NextResponse.json({
            success: true,
            message: "In-kind donation request received successfully",
            data: newInKindDonation
        }, { status: 201 });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                details: (error as z.ZodError).errors
            }, { status: 400 });
        }

        console.error("Error saving in-kind donation:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to process request"
        }, { status: 500 });
    }
}

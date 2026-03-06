import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const volunteerSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    dob: z.string().refine((date) => {
        if (!date) return false;
        const age = new Date().getFullYear() - new Date(date).getFullYear()
        return age >= 16
    }, "You must be at least 16 years old"),

    gender: z.string().min(1, "Please select gender"),

    nationality: z
        .string()
        .min(2, "Nationality is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    address: z.string().min(10, "Permanent address required"),

    city: z
        .string()
        .min(2, "City is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    state: z
        .string()
        .min(2, "State is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    country: z
        .string()
        .min(2, "Country is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    pincode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit PIN"),

    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit number"),

    email: z.string().email("Enter valid email"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = volunteerSchema.parse(body);

        // Save to database
        const newApplication = await prisma.volunteerApplication.create({
            data: {
                fullName: validatedData.fullName,
                dob: validatedData.dob,
                gender: validatedData.gender,
                nationality: validatedData.nationality,
                address: validatedData.address,
                city: validatedData.city,
                state: validatedData.state,
                country: validatedData.country,
                pincode: validatedData.pincode,
                phone: validatedData.phone,
                email: validatedData.email,
                status: "UNREAD"
            }
        });

        await prisma.notification.create({
            data: {
                title: "New Volunteer Application",
                message: `${validatedData.fullName} applied to be a volunteer.`,
                type: "VOLUNTEER"
            }
        });

        return NextResponse.json({
            success: true,
            message: "Application received successfully",
            data: newApplication
        }, { status: 201 });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                details: (error as any).errors
            }, { status: 400 });
        }

        console.error("Error saving volunteer application:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to process application"
        }, { status: 500 });
    }
}

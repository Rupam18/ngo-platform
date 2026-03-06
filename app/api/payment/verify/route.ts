import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            donationId
        } = await req.json();

        // Verify the signature
        const secret = process.env.RAZORPAY_KEY_SECRET!;
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, error: "Payment verification failed" },
                { status: 400 }
            );
        }

        // Signature is valid, update the donation status to SUCCESS
        const donation = await prisma.donation.update({
            where: { id: donationId },
            data: {
                status: "SUCCESS",
                receiptNumber: razorpay_payment_id // Update receipt number with actual payment ID
            },
            include: {
                user: true,
                donor: true
            }
        });

        const donorName = donation.user?.name || donation.donor?.name || "Someone";

        await prisma.notification.create({
            data: {
                title: "New Online Donation",
                message: `${donorName} made an online donation of ₹${donation.amount}.`,
                type: "DONATION"
            }
        });

        return NextResponse.json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { success: false, error: "Error verifying payment" },
            { status: 500 }
        );
    }
}

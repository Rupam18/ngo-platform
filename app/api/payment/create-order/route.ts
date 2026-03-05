import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { amount, fullName, email, phone, purpose, message, campaignId } = await req.json();

        // 1. Create Order in Razorpay
        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // 2. Save Initial Donation Record in DB as 'PENDING'
        // First check if donor exists by email
        let donor = await prisma.donor.findFirst({ where: { email } });

        if (!donor) {
            donor = await prisma.donor.create({
                data: { name: fullName, email, pan: null }, // pan can be added later
            });
        }

        const donation = await prisma.donation.create({
            data: {
                amount,
                status: "PENDING",
                donorId: donor.id,
                campaignId: campaignId || null,
                paymentMethod: "RAZORPAY",
                receiptNumber: order.id, // Using Razorpay order ID initially as tracking reference
                type: "ONLINE"
            }
        });

        return NextResponse.json({
            success: true,
            order,
            donationId: donation.id
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create payment order" },
            { status: 500 }
        );
    }
}

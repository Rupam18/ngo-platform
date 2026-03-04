import { Request, Response } from "express"
import Razorpay from "razorpay"
import crypto from "crypto"
import { generate80GReceiptService } from "../services/taxReceipt.service"
import { prisma } from "../config/prisma"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export const createOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { amount } = req.body

        const options = {
            amount: amount * 100, // paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpay.orders.create(options)

        return res.json(order)

    } catch (error) {
        return res.status(500).json({ message: "Error creating order", error })
    }
}

export const verifyPayment = async (req: any, res: Response): Promise<any> => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            campaignId,
            amount
        } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" })
        }

        // Save donation
        const donation = await prisma.donation.create({
            data: {
                amount,
                userId: req.user.userId,
                campaignId,
                status: "SUCCESS",
                paymentMethod: "RAZORPAY" // Tracking payment method for receipt
            }
        })

        // Automatically generate 80G Tax Receipt
        generate80GReceiptService(donation.id).catch((err) => {
            console.error("Failed to auto-generate 80G receipt:", err);
        });

        // Optional: Update campaign status if goal reached
        const totalRaised = await prisma.donation.aggregate({
            where: { campaignId },
            _sum: { amount: true }
        })

        const campaign = await prisma.campaign.findUnique({
            where: { id: campaignId }
        })

        if (campaign && totalRaised._sum.amount! >= campaign.goal) {
            await prisma.campaign.update({
                where: { id: campaignId },
                data: { status: "COMPLETED" }
            })
        }

        return res.json({ message: "Payment verified", donation })

    } catch (error) {
        return res.status(500).json({ message: "Verification failed", error })
    }
}

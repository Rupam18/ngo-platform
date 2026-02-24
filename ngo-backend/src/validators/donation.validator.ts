import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        amount: z.number().positive("Amount must be greater than zero")
    })
});

export const verifyPaymentSchema = z.object({
    body: z.object({
        razorpay_order_id: z.string().min(1, "Missing Razorpay Order ID"),
        razorpay_payment_id: z.string().min(1, "Missing Razorpay Payment ID"),
        razorpay_signature: z.string().min(1, "Missing Razorpay Signature"),
        campaignId: z.string().min(1, "Missing Campaign ID for donation attribution"),
        amount: z.number().positive()
    })
});

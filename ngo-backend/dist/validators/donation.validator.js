"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPaymentSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().positive("Amount must be greater than zero")
    })
});
exports.verifyPaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        razorpay_order_id: zod_1.z.string().min(1, "Missing Razorpay Order ID"),
        razorpay_payment_id: zod_1.z.string().min(1, "Missing Razorpay Payment ID"),
        razorpay_signature: zod_1.z.string().min(1, "Missing Razorpay Signature"),
        campaignId: zod_1.z.string().min(1, "Missing Campaign ID for donation attribution"),
        amount: zod_1.z.number().positive()
    })
});

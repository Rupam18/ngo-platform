"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../config/prisma");
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);
        return res.json(order);
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating order", error });
    }
};
exports.createOrder = createOrder;
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, campaignId, amount } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }
        // Save donation
        const donation = await prisma_1.prisma.donation.create({
            data: {
                amount,
                userId: req.user.userId,
                campaignId,
                status: "SUCCESS"
            }
        });
        // Optional: Update campaign status if goal reached
        const totalRaised = await prisma_1.prisma.donation.aggregate({
            where: { campaignId },
            _sum: { amount: true }
        });
        const campaign = await prisma_1.prisma.campaign.findUnique({
            where: { id: campaignId }
        });
        if (campaign && totalRaised._sum.amount >= campaign.goal) {
            await prisma_1.prisma.campaign.update({
                where: { id: campaignId },
                data: { status: "COMPLETED" }
            });
        }
        return res.json({ message: "Payment verified", donation });
    }
    catch (error) {
        return res.status(500).json({ message: "Verification failed", error });
    }
};
exports.verifyPayment = verifyPayment;

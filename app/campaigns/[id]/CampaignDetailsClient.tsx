"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Activity, ArrowLeft, Target, Users } from "lucide-react";

export default function CampaignDetailsClient({ campaign, raisedAmount, progress }: any) {
    const [showDonate, setShowDonate] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        pan: "",
    });

    const handleDonateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAmount || selectedAmount < 100) {
            alert("Minimum donation amount is ₹100");
            return;
        }

        setIsProcessing(true);
        try {
            // 1. Create order
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: selectedAmount,
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    purpose: "campaign",
                    campaignId: campaign.id,
                }),
            });
            const orderData = await res.json();

            if (!orderData.success) {
                alert("Failed to create order. Please try again.");
                return;
            }

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: "NGO Platform",
                description: `Support ${campaign.title}`,
                order_id: orderData.order.id,
                handler: async function (response: any) {
                    // 3. Verify payment
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            donationId: orderData.donationId,
                        }),
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Donation successful! Thank you for your support.");
                        setShowDonate(false);
                        // Can trigger a re-fetch of campaign details here if needed
                    } else {
                        alert("Payment verification failed.");
                    }
                },
                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: "#0056A6",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Payment initialization error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="max-w-5xl mx-auto px-6">
                <Link href="/">
                    <Button variant="outline" size="sm" className="mb-8 font-semibold flex items-center gap-2 text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900 shadow-sm">
                        <ArrowLeft size={16} /> Back to Home
                    </Button>
                </Link>

                {/* Main Content Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-100 flex flex-col md:flex-row"
                >
                    {/* Image Section (Reduced Height for Desktop, Responsive) */}
                    <div className="md:w-1/2 relative h-[300px] md:h-auto overflow-hidden group">
                        <motion.img
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                            src={campaign.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"}
                            alt={campaign.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                        {/* Status Badge overlay */}
                        <div className="absolute top-6 left-6 z-10">
                            <span className="bg-white/95 backdrop-blur-md text-[#800000] text-xs font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wide">
                                Active Campaign
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight leading-tight">{campaign.title}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8 line-clamp-3">
                                {campaign.description || "A wonderful campaign to support and bring meaningful change to those who need it most. Every contribution matters."}
                            </p>

                            {/* Progress Metrics */}
                            <div className="mb-8 p-6 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-end mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                            <Activity size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Raised</p>
                                            <p className="font-bold text-[#0056A6] text-2xl">₹{raisedAmount.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Goal</p>
                                        <p className="font-bold text-gray-900 text-xl">₹{campaign.goal.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden mt-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(progress, 100)}%` }}
                                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-[#0056A6] to-blue-400 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CTA Setup */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                onClick={() => {
                                    setShowDonate(true);
                                    setTimeout(() => window.scrollBy({ top: 600, behavior: "smooth" }), 50);
                                }}
                                variant="primary"
                                size="lg"
                                className="w-full py-5 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-[#800000]/30"
                            >
                                <Heart className="fill-white" size={24} /> Donate Now
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Sub-Description Section (Full details) */}
            <div className="max-w-4xl mx-auto px-6 mt-12 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Campaign</h3>
                <div className="prose prose-lg text-gray-700 w-full max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed">{campaign.description}</p>
                </div>
            </div>

            {/* Animated Donate Form Section */}
            <AnimatePresence>
                {showDonate && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="mt-12 bg-[#F5F7FA] py-20 px-6 border-t border-gray-200"
                    >
                        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">

                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#0056A6] mb-4">
                                    <Heart size={32} />
                                </div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                    Complete Your Donation
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    You are supporting <span className="font-bold text-[#0056A6]">{campaign.title}</span>
                                </p>
                            </div>

                            {/* Amount Options */}
                            <div className="flex gap-4 flex-wrap mb-8 justify-center">
                                {[500, 1000, 2500, 5000].map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => setSelectedAmount(amt)}
                                        className={`px-8 py-4 rounded-xl border-2 font-bold text-lg transition-all duration-300 ${selectedAmount === amt
                                            ? "bg-[#0056A6] text-white border-transparent shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] scale-105"
                                            : "border-gray-200 text-gray-600 hover:border-[#0056A6]/40 hover:text-[#0056A6] bg-white hover:scale-105 shadow-sm"
                                            }`}
                                    >
                                        ₹{amt.toLocaleString('en-IN')}
                                    </button>
                                ))}
                            </div>

                            {/* Form Elements */}
                            <form className="space-y-6" onSubmit={handleDonateSubmit}>
                                <div className="relative mb-8">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Enter Custom Amount"
                                        onChange={(e) => setSelectedAmount(Number(e.target.value) || null)}
                                        value={selectedAmount && ![500, 1000, 2500, 5000].includes(selectedAmount) ? selectedAmount : ""}
                                        className="w-full bg-gray-50 border border-gray-200 pl-12 pr-6 py-5 rounded-2xl text-xl font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0056A6]/50 focus:border-[#0056A6] outline-none transition-all"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#0056A6]/50 focus:border-[#0056A6] outline-none transition-all shadow-sm"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#0056A6]/50 focus:border-[#0056A6] outline-none transition-all shadow-sm"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#0056A6]/50 focus:border-[#0056A6] outline-none transition-all shadow-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Pan Card (Optional)"
                                        value={formData.pan}
                                        onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#0056A6]/50 focus:border-[#0056A6] outline-none transition-all shadow-sm"
                                    />
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button type="submit" disabled={isProcessing} variant="primary" size="lg" className={`w-full py-5 rounded-2xl text-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                        {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                                    </Button>
                                </motion.div>
                            </form>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setShowDonate(false)}
                                    className="text-sm font-bold text-gray-500 hover:text-red-600 transition uppercase tracking-wider"
                                >
                                    Cancel & Return
                                </button>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

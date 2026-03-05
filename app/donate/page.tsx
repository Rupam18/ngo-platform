"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { ShieldCheck, CheckCircle, Receipt, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const donateSchema = z.object({
    amount: z.number().min(100, "Minimum donation amount is ₹100"),
    fullName: z.string().min(2, "Full name is required").regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian phone number"),
    purpose: z.string().min(1, "Please select donation purpose"),
    message: z.string().optional(),
});

type DonateFormData = z.infer<typeof donateSchema>;

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function DonatePage() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
    const [isProcessing, setIsProcessing] = useState(false);
    const amounts = [500, 1000, 2500, 5000, 10000];

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<DonateFormData>({
        resolver: zodResolver(donateSchema),
        mode: "onChange",
        defaultValues: {
            amount: 1000,
        },
    });

    const onSubmit = async (data: DonateFormData) => {
        setIsProcessing(true);
        try {
            // 1. Create order
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const orderData = await res.json();

            if (!orderData.success) {
                toast.error(orderData.error || "Failed to create order. Please try again.");
                console.error("Order creation failed details:", orderData.details);
                return;
            }

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: "NGO Platform",
                description: "Donation Contribution",
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
                        toast.success("Donation successful! Thank you for your contribution.");
                        // Optional: Reset form or redirect
                    } else {
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: data.fullName,
                    email: data.email,
                    contact: data.phone,
                },
                theme: {
                    color: "#0056A6",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Payment initialization error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <StickyHeader />

            {/* Cinematic Hero Section (Aligned with consistent banners) */}
            <section className="relative w-full h-[250px] md:h-[300px] lg:h-[400px] flex items-center justify-center text-white overflow-hidden">
                <Image
                    src="/together.avif"
                    fill
                    className="object-cover object-[center_35%]"
                    alt="Make a Donation"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                        Make a Difference <span className="text-[#800000]">Today</span>
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md font-medium">
                        Your small contribution can change a life. Join us in our mission to uplift the underprivileged.
                    </p>
                </motion.div>
            </section>

            {/* Trust Section */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-[#0056A6]/10 rounded-2xl p-6 text-center shadow-sm">
                        <h4 className="font-bold text-[#0056A6] text-lg">100% Secure</h4>
                        <p className="text-gray-600 text-sm mt-2">
                            Payments processed through encrypted gateway.
                        </p>
                    </div>

                    <div className="bg-[#0056A6]/10 rounded-2xl p-6 text-center shadow-sm">
                        <h4 className="font-bold text-[#0056A6] text-lg">Verified NGO</h4>
                        <p className="text-gray-600 text-sm mt-2">
                            Registered under Section 25. PAN & 80G compliant.
                        </p>
                    </div>

                    <div className="bg-[#0056A6]/10 rounded-2xl p-6 text-center shadow-sm">
                        <h4 className="font-bold text-[#0056A6] text-lg">Tax Benefit</h4>
                        <p className="text-gray-600 text-sm mt-2">
                            Eligible for tax exemption under 80G.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#0056A6]/5 to-[#800000]/5 flex-grow">
                <div className="max-w-6xl mx-auto space-y-10">
                    {/* TOP HORIZONTAL CARDS */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Our Direct Impact */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Direct Impact</h3>
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0056A6]/10 rounded-full flex items-center justify-center text-[#0056A6]">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">500+</p>
                                        <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Children Helped</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0056A6]/10 rounded-full flex items-center justify-center text-[#0056A6]">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">10+</p>
                                        <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Active Projects</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#800000]/10 rounded-full flex items-center justify-center text-[#800000]">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">1000+</p>
                                        <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Volunteers</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ₹500 Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-center"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                ₹500 provides educational supplies for 1 child
                            </h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Your donation is not just a transaction — it is an investment in someone's future.
                            </p>
                        </motion.div>

                    </div>

                    {/* Full Width Donation Form Below */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative bg-white/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-gray-100 rounded-3xl p-8 md:p-12 overflow-hidden group"
                    >
                        {/* Glowing Border Background */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-yellow-400 to-indigo-500 rounded-[24px] blur-sm opacity-20 group-hover:opacity-40 transition duration-700 pointer-events-none" />

                        <div className="relative">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-4xl font-extrabold text-[#0056A6] tracking-tight"
                            >
                                Choose Your Contribution
                            </motion.h2>
                            <p className="mt-2 text-gray-600 text-lg mb-8 border-b border-gray-200/60 pb-6">
                                Every rupee you give directly supports children, education and health initiatives.
                            </p>

                            {/* Amount Chips */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                {amounts.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => {
                                            setSelectedAmount(amount);
                                            setValue("amount", amount, { shouldValidate: true });
                                        }}
                                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${selectedAmount === amount
                                            ? "bg-[#0056A6] text-white border-transparent shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] scale-105"
                                            : "bg-white text-[#0056A6] border-[#0056A6]/30 hover:border-[#0056A6] hover:shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] hover:scale-105"
                                            }`}
                                    >
                                        ₹{amount.toLocaleString('en-IN')}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Custom Amount */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 invisible h-0">Custom Amount Spacer</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Enter Custom Amount"
                                            {...register("amount", { valueAsNumber: true })}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                setSelectedAmount(value || null);
                                            }}
                                            className={`w-full pl-8 pr-4 py-4 rounded-xl border-2 ${errors.amount ? "border-red-500" : "border-gray-200"} bg-white/90 focus:border-[#0056A6] focus:ring-0 outline-none transition-all shadow-sm font-bold text-gray-900 placeholder-gray-500`}
                                        />
                                    </div>
                                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            {...register("fullName")}
                                            placeholder="Full Name"
                                            className={`w-full px-4 py-4 rounded-xl border-2 ${errors.fullName ? "border-red-500" : "border-gray-200 focus:border-[#0056A6]"} bg-white/90 focus:ring-0 outline-none transition-all shadow-sm font-semibold text-gray-900`}
                                        />
                                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder="Email Address"
                                            className={`w-full px-4 py-4 rounded-xl border-2 ${errors.email ? "border-red-500" : "border-gray-200 focus:border-[#0056A6]"} bg-white/90 focus:ring-0 outline-none transition-all shadow-sm font-semibold text-gray-900`}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            type="tel"
                                            {...register("phone")}
                                            placeholder="Phone Number"
                                            className={`w-full px-4 py-4 rounded-xl border-2 ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-[#0056A6]"} bg-white/90 focus:ring-0 outline-none transition-all shadow-sm font-semibold text-gray-900`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                        <select
                                            {...register("purpose")}
                                            className={`w-full px-4 py-4 rounded-xl border-2 ${errors.purpose ? "border-red-500" : "border-gray-200 focus:border-[#0056A6]"} bg-white/90 focus:ring-0 outline-none transition-all shadow-sm font-semibold text-gray-900`}
                                        >
                                            <option value="">Donation Purpose</option>
                                            <option value="general">General Fund</option>
                                            <option value="education">Child Education</option>
                                            <option value="health">Healthcare Support</option>
                                            <option value="women">Women Empowerment</option>
                                        </select>
                                        {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <textarea
                                        {...register("message")}
                                        placeholder="Leave a message with your donation (Optional)"
                                        rows={3}
                                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white/90 focus:border-[#0056A6] focus:ring-0 outline-none transition-all shadow-sm font-semibold text-gray-900 resize-none"
                                    />
                                </div>

                                {/* CTA Button */}
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        variant="primary"
                                        size="lg"
                                        className={`w-full py-4 text-lg rounded-2xl flex items-center justify-center gap-3 transition-all ${isProcessing ? "opacity-50 cursor-not-allowed" : ""
                                            } bg-[#800000] hover:bg-[#660000] text-white font-bold shadow-[0_4px_14px_0_rgba(128,0,0,0.2)] hover:-translate-y-[2px]`}
                                    >
                                        {isProcessing ? (
                                            <span className="animate-pulse">Processing...</span>
                                        ) : (
                                            <><ShieldCheck size={22} className="text-white/80" /> Proceed to Secure Payment</>
                                        )}
                                    </Button>
                                </motion.div>
                                <p className="text-center text-xs text-gray-500 mt-4 font-medium flex items-center justify-center gap-1">
                                    <Lock size={12} /> Encrypted & Secure Payment Gateway
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="mt-10 mb-16 text-center text-sm text-gray-800 font-medium px-6 max-w-4xl mx-auto leading-relaxed">
                Rostrum India Social Organization (RISO) is a registered non-profit organization
                based in Pune, Maharashtra. Registration No: <span className="font-bold">E-XXXX</span>. <br className="hidden md:block" />
                For donation queries: <a href="mailto:info@rostrumindia.org" className="text-[#0056A6] font-bold hover:underline">info@rostrumindia.org</a> | <a href="tel:+919730035255" className="text-[#0056A6] font-bold hover:underline">+91 9730035255</a>
            </div>

            <Footer />

            <style jsx global>{`
                @keyframes shine {
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </main>
    );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { ShieldCheck, CheckCircle, Receipt, Lock } from "lucide-react";

export default function DonatePage() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
    const amounts = [500, 1000, 2500, 5000, 10000];

    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* Cinematic Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center text-white mt-16 overflow-hidden">
                <Image
                    src="/joy-of-giving.jpg"
                    fill
                    className="object-cover"
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
                        Make a Difference <span className="text-red-500">Today</span>
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md font-medium">
                        Your small contribution can change a life. Join us in our mission to uplift the underprivileged.
                    </p>
                </motion.div>
            </section>

            {/* Main Content Area */}
            <section className="flex-grow max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12 w-full">

                {/* Left Side: Stats & Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-5 flex flex-col justify-center space-y-10"
                >
                    {/* Impact Stats */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-blue-900 mb-6 border-b pb-4">Our Direct Impact</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                <div>
                                    <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-extrabold text-gray-900">500+</motion.h4>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Children Helped</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-600">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                </div>
                                <div>
                                    <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-extrabold text-gray-900">10+</motion.h4>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Projects</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </div>
                                <div>
                                    <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-extrabold text-gray-900">1000+</motion.h4>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Volunteers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                            <ShieldCheck className="w-8 h-8 text-green-500 mb-2" />
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">100% Secure<br />Donation</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                            <CheckCircle className="w-8 h-8 text-blue-500 mb-2" />
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">Verified<br />NGO</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm col-span-2 lg:col-span-1 xl:col-span-1">
                            <Receipt className="w-8 h-8 text-yellow-500 mb-2" />
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">Tax Benefit<br />(80G)</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Glassmorphism Donation Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="lg:col-span-7 relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-3xl p-8 md:p-12 hover:shadow-[0_30px_80px_rgba(30,64,175,0.2)] transition-all duration-500 overflow-hidden group"
                >
                    {/* Glowing Border Background */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-yellow-400 to-indigo-500 rounded-[24px] blur-sm opacity-20 group-hover:opacity-40 transition duration-700 pointer-events-none" />

                    <div className="relative">
                        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 border-b border-gray-200/60 pb-4">
                            Select Donation Amount
                        </h2>

                        {/* Amount Chips */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            {amounts.map((amount) => (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={() => setSelectedAmount(amount)}
                                    className={`px-5 py-3 rounded-full border-2 transition-all duration-300 font-bold tracking-wide shadow-sm hover:shadow-md 
                                        ${selectedAmount === amount
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent scale-105 shadow-xl ring-4 ring-blue-500/20"
                                            : "border-blue-200 bg-white hover:bg-blue-50 text-blue-900 hover:scale-[1.03] active:scale-95"
                                        }`}
                                >
                                    ₹{amount.toLocaleString('en-IN')}
                                </button>
                            ))}
                        </div>

                        <form className="space-y-6">
                            {/* Custom Amount */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 invisible h-0">Custom Amount Spacer</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Enter Custom Amount"
                                        onChange={(e) => setSelectedAmount(Number(e.target.value) || null)}
                                        value={selectedAmount && !amounts.includes(selectedAmount) ? selectedAmount : ""}
                                        className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-inner font-semibold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <select
                                        className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner font-medium text-gray-600"
                                        required
                                    >
                                        <option value="">Donation Purpose</option>
                                        <option value="general">General Fund</option>
                                        <option value="education">Child Education</option>
                                        <option value="health">Healthcare Support</option>
                                        <option value="women">Women Empowerment</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <textarea
                                    placeholder="Leave a message with your donation (Optional)"
                                    rows={3}
                                    className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner font-medium resize-none"
                                ></textarea>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg py-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                            >
                                {/* Shine Effect */}
                                <span className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:animate-[shine_1s_infinite]"></span>

                                <Lock size={20} /> Proceed Securely
                            </motion.button>
                            <p className="text-center text-xs text-gray-500 mt-4 font-medium flex items-center justify-center gap-1">
                                <Lock size={12} /> Encrypted & Secure Payment Gateway
                            </p>
                        </form>
                    </div>
                </motion.div>
            </section>

            <Footer />

            <style jsx global>{`
                @keyframes shine {
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </main>
    );
}

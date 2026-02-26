"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CampaignDetailsClient({ campaign, raisedAmount, progress }: any) {
    const [showDonate, setShowDonate] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);

    return (
        <>
            <div className="max-w-4xl mx-auto px-6">
                <Link href="/campaigns">
                    <Button variant="outline" className="mb-6 font-semibold">← Back to Campaigns</Button>
                </Link>

                {/* Campaign Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <img
                        src={campaign.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"}
                        alt={campaign.title}
                        className="w-full h-[450px] object-cover"
                    />
                    <div className="p-8 md:p-12">
                        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">{campaign.title}</h1>

                        <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <div className="text-gray-500">Raised: <span className="font-bold text-blue-700 text-xl block md:inline md:ml-2">₹{raisedAmount.toLocaleString('en-IN')}</span></div>
                                <div className="text-gray-500 text-right">Goal: <span className="font-bold text-gray-900 text-xl block md:inline md:ml-2">₹{campaign.goal.toLocaleString('en-IN')}</span></div>
                            </div>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed mb-10 whitespace-pre-wrap">
                            {campaign.description || "A wonderful campaign to support."}
                        </p>

                        <button
                            onClick={() => {
                                setShowDonate(true);
                                // Slightly scroll to bring the form into view smoothly
                                setTimeout(() => window.scrollBy({ top: 500, behavior: "smooth" }), 50);
                            }}
                            className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                        >
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated Donate Section */}
            <AnimatePresence>
                {showDonate && (
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 80 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mt-16 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 py-24 px-6 relative"
                    >
                        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">

                            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3 tracking-tight">
                                Complete Your Donation
                            </h2>
                            <p className="text-gray-600 mb-10 text-lg">
                                Your contribution directly supports <span className="font-bold text-blue-700">{campaign.title}</span>.
                            </p>

                            {/* Amount Options */}
                            <div className="flex gap-4 flex-wrap mb-8">
                                {[500, 1000, 2500, 5000].map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => setSelectedAmount(amt)}
                                        className={`px-6 py-4 rounded-full border-2 font-bold text-lg transition-all duration-300 ${selectedAmount === amt
                                                ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                                                : "border-blue-200 text-blue-600 hover:border-blue-500 hover:shadow-md hover:scale-105 bg-white"
                                            }`}
                                    >
                                        ₹{amt.toLocaleString('en-IN')}
                                    </button>
                                ))}
                            </div>

                            {/* Form */}
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Custom Amount */}
                                <div className="mb-2">
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Enter Custom Amount"
                                            onChange={(e) => setSelectedAmount(Number(e.target.value) || null)}
                                            value={selectedAmount && ![500, 1000, 2500, 5000].includes(selectedAmount) ? selectedAmount : ""}
                                            className="premium-input pl-10 font-bold text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="premium-input font-medium"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="premium-input font-medium"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="premium-input font-medium"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Donation Purpose (Optional)"
                                        className="premium-input font-medium"
                                    />
                                </div>

                                <button type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
                                    Proceed to Payment
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setShowDonate(false)}
                                    className="text-sm font-bold text-gray-400 hover:text-gray-800 transition uppercase tracking-wider"
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

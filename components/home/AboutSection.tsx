"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative z-10">
                            <span className="text-blue-600 block text-lg font-semibold tracking-wide uppercase mb-2">About RISO</span>
                            Rostrum India Social Organization
                        </h2>
                        <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl" />
                    </div>

                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            Rostrum India Social Organization (RISO) is a non-profit organization dedicated to the holistic development of society.
                            Our mission is to empower underprivileged communities by providing access to quality education, healthcare, and sustainable livelihood opportunities.
                        </p>
                        <p>
                            We believe that every individual has the potential to contribute meaningfully to society if given the right support and platform.
                            Through our various initiatives, we strive to bridge the gap between privilege and need, creating a more equitable world for all.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                            Know More About Us
                        </Button>
                    </div>
                </motion.div>

                {/* Right: Donation Card */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative"
                >
                    <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        URGENT CAUSE
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">help us to support</h3>
                    <p className="text-gray-500 mb-6">Your contribution can change a life today.</p>

                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-blue-800">Educate a Child</span>
                                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded">₹1000/mo</span>
                            </div>
                            <p className="text-sm text-blue-600">Sponsor school fees and books.</p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border border-green-100 cursor-pointer hover:bg-green-100 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-green-800">Plant a Tree</span>
                                <span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded">₹500/unit</span>
                            </div>
                            <p className="text-sm text-green-600"> contribute to a greener planet.</p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 cursor-pointer hover:bg-purple-100 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-purple-800">Feed the Hungry</span>
                                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded">Any Amount</span>
                            </div>
                            <p className="text-sm text-purple-600">Provide nutritious meals.</p>
                        </div>
                    </div>

                    <Button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold shadow-md">
                        Donate Now
                    </Button>
                </motion.div>

            </div>
        </section>
    );
}

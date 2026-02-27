"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import StickyHeader from "@/components/home/StickyHeader"
import Footer from "@/components/home/Footer"

export default function InKindDonation() {
    const [formData, setFormData] = useState({})

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* Main Content Area matching Donate Page Spacing */}
            {/* Main Content Area */}
            <section className="flex-grow max-w-5xl mx-auto px-6 py-10 mt-8 w-full mb-16 space-y-12">

                {/* 🔵 SUPPORT CARD - NOW AT TOP */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden group"
                >
                    {/* Subtle decorative background blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 group-hover:bg-blue-100 transition-colors duration-700" />

                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">
                        Support Through <span className="text-blue-600">In-Kind Donation</span>
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl font-medium">
                        Your non-monetary contributions such as clothes, books, grains,
                        computers and educational supplies directly support children
                        and communities in need.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">

                        <motion.div whileHover={{ y: -5 }} className="flex items-start gap-4">
                            <div className="bg-blue-100 p-4 rounded-2xl text-2xl shadow-sm border border-blue-50">👕</div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Clothes & Essentials</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    Support families with basic necessities.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="flex items-start gap-4">
                            <div className="bg-yellow-100 p-4 rounded-2xl text-2xl shadow-sm border border-yellow-50">📚</div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Books & Stationery</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    Help children continue their education.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="flex items-start gap-4">
                            <div className="bg-purple-100 p-4 rounded-2xl text-2xl shadow-sm border border-purple-50">💻</div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Computers & Devices</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    Bridge the digital divide.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>

                {/* 🟣 FORM CARD - NOW BELOW SUPPORT CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-1.5 rounded-[32px] shadow-2xl relative group"
                >
                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-[32px] blur-xl opacity-20 group-hover:opacity-60 transition duration-700 pointer-events-none" />

                    <div className="bg-white rounded-[28px] p-8 md:p-12 relative z-10">

                        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 border-b border-gray-100 pb-6">
                            Donation <span className="text-blue-600">In-Kind Form</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Section 1: Donor Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <input name="firstName" placeholder="First Name" className="premium-input font-medium" onChange={handleChange as any} required />
                                <input name="lastName" placeholder="Last Name" className="premium-input font-medium" onChange={handleChange as any} required />
                                <input name="email" type="email" placeholder="Email Address" className="premium-input font-medium" onChange={handleChange as any} required />
                                <input name="mobile" placeholder="Phone Number" className="premium-input font-medium" onChange={handleChange as any} required />

                                <textarea
                                    name="address"
                                    placeholder="Detailed Pickup Address"
                                    rows={3}
                                    className="premium-input md:col-span-2 font-medium resize-none"
                                    onChange={handleChange as any}
                                    required
                                />

                                <input
                                    name="subject"
                                    placeholder="Donation Purpose (Subject)"
                                    className="premium-input md:col-span-2 font-medium"
                                    onChange={handleChange as any}
                                    required
                                />
                            </div>

                            {/* Section 2: Items */}
                            <h3 className="text-xl font-bold text-gray-800 mt-10 mb-6">
                                Items for Donation
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                                <input name="clothes" placeholder="Clothes (Kg)" className="premium-input font-medium" onChange={handleChange as any} />
                                <input name="books" placeholder="Books (Units)" className="premium-input font-medium" onChange={handleChange as any} />
                                <input name="raddi" placeholder="Raddi (Kg)" className="premium-input font-medium" onChange={handleChange as any} />
                                <input name="grains" placeholder="Grains (Kg)" className="premium-input font-medium" onChange={handleChange as any} />
                                <input name="stationary" placeholder="Stationery (Units)" className="premium-input font-medium" onChange={handleChange as any} />
                                <input name="computers" placeholder="Computers (Units)" className="premium-input font-medium" onChange={handleChange as any} />
                            </div>

                            <textarea
                                name="otherItems"
                                placeholder="Other Items not listed above (Optional)..."
                                rows={2}
                                className="premium-input mt-4 font-medium resize-none"
                                onChange={handleChange as any}
                            />

                            <textarea
                                name="message"
                                placeholder="Message or Special Instructions (Optional)"
                                rows={3}
                                className="premium-input mt-4 font-medium resize-none"
                                onChange={handleChange as any}
                            />

                            <div className="pt-8 w-full">
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full py-5 rounded-2xl text-lg flex items-center justify-center relative overflow-hidden group/btn"
                                    >
                                        <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                                        Submit Donation Request
                                    </Button>
                                </motion.div>
                            </div>

                        </form>

                    </div>
                </motion.div>

            </section>

            <Footer />
        </main>
    )
}

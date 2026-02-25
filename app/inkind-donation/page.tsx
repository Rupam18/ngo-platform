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
            <section className="flex-grow max-w-7xl mx-auto px-6 py-6 mt-16 grid lg:grid-cols-12 gap-12 w-full mb-16">

                {/* LEFT SIDE - Impact Info (Col Span 5 matching stats) */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-5 flex flex-col justify-center space-y-10"
                >
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 border-b pb-4">
                            Support Through
                            <span className="text-blue-600 block mt-2"> In-Kind Donation</span>
                        </h2>

                        <p className="text-gray-600 leading-relaxed text-lg mb-8 font-medium">
                            Your non-monetary contributions such as clothes, books,
                            grains, computers and educational supplies directly support
                            children and communities in need.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl shadow-sm">
                                    👕
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Clothes & Essentials</h4>
                                    <p className="text-sm font-medium text-gray-500">
                                        Support families with basic necessities.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 text-2xl shadow-sm">
                                    📚
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Books & Stationery</h4>
                                    <p className="text-sm font-medium text-gray-500">
                                        Help children continue their education.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl shadow-sm">
                                    💻
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Computers & Devices</h4>
                                    <p className="text-sm font-medium text-gray-500">
                                        Bridge the digital divide.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT SIDE - FORM (Col Span 7 matching donation form) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7 relative bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-gray-100 rounded-3xl p-8 md:p-12 overflow-hidden group"
                >
                    {/* Glowing Border Background */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-yellow-400 to-indigo-500 rounded-[24px] blur-sm opacity-20 group-hover:opacity-40 transition duration-700 pointer-events-none" />

                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight">
                            Donation <span className="text-blue-600">In Kind</span>
                        </h2>
                        <p className="mt-2 text-gray-600 text-lg mb-8 border-b border-gray-200/60 pb-6">
                            Fill out the secure form below. Our team will contact you shortly to coordinate the drop-off or pickup.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid md:grid-cols-2 gap-6">
                                <input name="firstName" placeholder="First Name" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" required />
                                <input name="lastName" placeholder="Last Name" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" required />
                                <input name="email" type="email" placeholder="Email Address" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" required />
                                <input name="mobile" placeholder="Phone Number" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" required />
                            </div>

                            <textarea name="address" placeholder="Detailed Pickup Address" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500 min-h-[100px] resize-none" required />
                            <input name="subject" placeholder="Donation Purpose (Subject)" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" required />

                            <h3 className="font-bold text-gray-700 mt-8 mb-4">
                                Items for Donation
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                                <input name="clothes" placeholder="Clothes (Kg)" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" />
                                <input name="books" placeholder="Books (Units)" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" />
                                <input name="raddi" placeholder="Raddi (Kg)" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" />
                                <input name="grains" placeholder="Grains (Kg)" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" />
                                <input name="stationary" placeholder="Stationery (Units)" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" />
                                <input name="computers" placeholder="Computers (Units)" onChange={handleChange as any} className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500" />
                            </div>

                            <textarea name="otherItems" placeholder="Other Items not listed above (Optional)..." className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500 min-h-[80px] resize-none" onChange={handleChange as any} />
                            <textarea name="message" placeholder="Message or Special Instructions (Optional)" className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-semibold text-gray-900 placeholder-gray-500 min-h-[100px] resize-none" onChange={handleChange as any} />

                            <div className="pt-6">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all text-lg flex items-center justify-center relative overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                    Submit Donation Request
                                </motion.button>
                            </div>

                        </form>
                    </div>
                </motion.div>

            </section>

            <Footer />
        </main>
    )
}

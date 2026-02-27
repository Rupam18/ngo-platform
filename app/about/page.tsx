
"use client";

import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Eye, Target } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import WhatDrivesUs from "@/components/about/WhatDrivesUs";
import OurPurpose from "@/components/about/OurPurpose";
import OurBelief from "@/components/about/OurBelief";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <StickyHeader />

            {/* 1. HERO SECTION (Aligned with Programs Page) */}
            <section className="relative w-full h-[280px] md:h-[350px] lg:h-[400px] overflow-hidden">
                <Image
                    src="/headerbanner-riso.jpg"
                    alt="About Us Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 md:bg-black/60 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center px-4"
                    >
                        <span className="text-yellow-400 font-bold tracking-wider uppercase text-sm mb-3 block drop-shadow-md">
                            Who We Are
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest uppercase drop-shadow-lg mb-4 mt-2">
                            About Us
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-md hidden md:block">
                            Discover our story, our vision, and the impact we strive to make.
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mx-auto mt-6 shadow-lg shadow-black/50" />
                    </motion.div>
                </div>
            </section>

            <section className="relative py-20 overflow-hidden">
                {/* Top Wave Decoration (Optional/Subtle) */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#f8fafc]"></path>
                    </svg>
                </div>

                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center mt-8">

                    {/* LEFT CONTENT */}
                    <div className="space-y-8">

                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center lg:text-left"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                About <span className="text-red-600">RISO</span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto lg:mx-0 rounded-full" />
                        </motion.div>

                        {/* Text */}
                        <div className="space-y-4 text-gray-600 text-lg leading-relaxed text-balance">
                            <p>
                                RISO is registered as a Non-profit organization (NGO) based in Pune, Maharashtra (INDIA).
                                RISO is registered under section 25, of the Companies act of 1956. Rostrum India Social
                                Organization is an initiative triggered by the alliance of the youth from all sections of our society.
                            </p>
                            <p>
                                The youth of this country has a tremendous potential, primarily due to its sheer size. We
                                strive to mobilize them in order to make them understand their responsibilities towards the
                                society and inspire them to take up social work, which will lead to a better tomorrow.
                            </p>
                        </div>

                        {/* Cards: Vision & Mission */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Vision Card */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Eye size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Our vision at RISO is to spread social awareness, empower the rural as well as urban communities of our society.
                                </p>
                            </motion.div>

                            {/* Mission Card */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden"
                            >
                                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    To inspire and mobilize Indian youth and gather active public support in order to work for the betterment of the society.
                                </p>
                            </motion.div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/programs">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button variant="secondary" size="lg" className="rounded-full flex items-center gap-3 overflow-hidden group shadow-[0_4px_14px_0_rgba(0,0,0,0.08)]">
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                        <span className="relative z-10">KNOW MORE</span>
                                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>
                            </Link>

                            <Link href="/reports">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button variant="outline" size="lg" className="rounded-full flex items-center gap-3 group shadow-sm hover:shadow-md">
                                        ANNUAL REPORT
                                        <motion.div
                                            variants={{
                                                hover: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 1.5 } }
                                            }}
                                            whileHover="hover"
                                        >
                                            <Download size={20} className="group-hover:text-blue-700" />
                                        </motion.div>
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Image Blob Shape */}
                        <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                            {/* Styling matching the prompt's organic shape feel */}
                            <div className="absolute inset-0 rounded-[40px] rounded-tr-[100px] rounded-bl-[100px] overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="/Image2.jpg"
                                    alt="About RISO Community"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full blur-xl opacity-40 -z-10" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full blur-xl opacity-30 -z-10" />
                        </div>
                    </motion.div>

                </div>
            </section>

            <WhatDrivesUs />
            <OurPurpose />
            <OurBelief />

            <Footer />
        </main>
    );
}

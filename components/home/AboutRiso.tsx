"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Eye, Target } from "lucide-react";
import Link from "next/link";

export default function AboutRiso() {
    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden relative">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">

                {/* CENTERED HEADING */}
                <div className="flex flex-col items-center justify-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-[#0056A6] font-bold tracking-wider uppercase text-sm mb-3 block">
                            Who We Are
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0056A6] mb-4">
                            About <span className="text-[#900000]">RISO</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-[#0056A6] rounded-full mx-auto" />
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

                    {/* LEFT CONTENT */}
                    <motion.div
                        className="flex flex-col justify-between h-full order-1 lg:order-1 w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="space-y-8">
                            {/* Description */}
                            <div className="space-y-5 text-gray-600 text-lg leading-relaxed text-balance">
                                <p>
                                    <span className="font-semibold text-gray-800">RISO</span> is registered as a Non-profit organization (NGO) based in Pune, Maharashtra (INDIA).
                                    RISO is registered under section 25 of the Companies act of 1956. Rostrum India Social Organization is an initiative triggered by the alliance of the youth from all sections of our society.
                                </p>
                                <p>
                                    The youth of this country has a tremendous potential, primarily due to its sheer size.
                                    We strive to mobilize them in order to make them understand their responsibilities towards the society and inspire them to take up social work, which will lead to a better tomorrow.
                                </p>
                            </div>

                            {/* Cards: Vision & Mission */}
                            <div className="grid md:grid-cols-2 gap-5">
                                {/* Vision Card */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-[#0056A6] group-hover:text-white transition-colors">
                                        <Eye size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Our vision at RISO is to spread social awareness, empower the rural as well as urban communities of our society, in order to bring a positive and constructive change.
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
                                        To inspire and mobilize Indian youth and gather active public support in order to work for the betterment of the society in all ways possible.
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Buttons Container aligned to bottom */}
                        <div className="flex flex-wrap gap-4 pt-4 mt-8">
                            <Link href="/about">
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
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        className="relative h-full flex justify-center lg:justify-end ml-0 lg:ml-6 order-2 lg:order-2 w-full lg:w-1/2 mt-12 lg:mt-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="relative w-full h-[350px] md:h-[500px] lg:h-full lg:min-h-[750px] max-w-xl mx-auto lg:mx-0 
                                        rounded-[2.5rem] lg:rounded-[3rem] 
                                        overflow-hidden shadow-2xl 
                                        border-4 border-white/50">

                            <Image
                                src="/aboutus.png"
                                alt="RISO Activities"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/25 via-transparent to-transparent" />
                        </div>

                        {/* Decorative Blur Effects */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-[70px] opacity-40 -z-10" />
                        <div className="absolute -top-10 -right-10 w-56 h-56 bg-blue-600 rounded-full blur-[80px] opacity-30 -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

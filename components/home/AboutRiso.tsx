"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Eye, Target } from "lucide-react";
import Link from "next/link";

export default function AboutRiso() {
    return (
        <section className="py-20 md:py-24 bg-white overflow-hidden relative">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">

                {/* CENTERED HEADING */}
                <div className="flex flex-col items-center justify-center text-center mb-16">
                    <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6" />
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                        <span className="text-blue-900">About</span> <span className="text-red-600">RISO</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

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
                            {/* Vision */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                    <Eye size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Our vision at RISO is to spread social awareness, empower the rural as well as urban communities of our society, in order to bring a positive and constructive change.
                                </p>
                            </motion.div>

                            {/* Mission */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    To inspire and mobilize Indian youth and gather active public support in order to work for the betterment of the society in all ways possible.
                                </p>
                            </motion.div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href="/about">
                                <Button className="h-12 px-8 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group">
                                    KNOW MORE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/reports">
                                <Button variant="outline" className="h-12 px-8 border-2 border-blue-900 text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2">
                                    ANNUAL REPORT <Download size={18} />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        className="relative h-full min-h-[500px] lg:min-h-[700px] w-full"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl animate-[float_5s_ease-in-out_infinite]">
                            <Image
                                src="/about-riso.png"
                                alt="RISO Activities"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>

                        {/* Decorative Blob */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-[60px] opacity-40 -z-10" />
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-600 rounded-full blur-[70px] opacity-30 -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

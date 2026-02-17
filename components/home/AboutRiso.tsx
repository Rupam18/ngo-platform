"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutRiso() {
    return (
        <section className="py-16 md:py-24 bg-[#f8fafc] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* RIGHT (Desktop) / TOP (Mobile): Image Card */}
                    {/* Order-first on mobile to show image on top, order-last on desktop to show on right */}
                    <motion.div
                        className="order-first lg:order-last relative mx-auto lg:mx-0 w-full max-w-lg lg:max-w-none"
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group h-[300px] sm:h-[400px] lg:h-[500px] w-full">
                            <Image
                                src="/banner.png" // Placeholder as agreed
                                alt="About RISO"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-colors duration-500" />
                        </div>

                        {/* Decorative Element */}
                        <div className="hidden md:block absolute -bottom-6 -left-6 w-24 h-24 bg-red-100 rounded-full -z-10 blur-xl opacity-70" />
                        <div className="hidden md:block absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full -z-10 blur-xl opacity-70" />
                    </motion.div>

                    {/* LEFT (Desktop) / BOTTOM (Mobile): Text Content */}
                    <motion.div
                        className="order-last lg:order-first text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="mb-6 md:mb-8 relative flex flex-col items-center lg:items-start">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "60px" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="h-1.5 bg-blue-600 rounded-full mb-4 md:mb-6"
                            />
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="text-blue-900">About </span>
                                <span className="text-red-600">RISO</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-base md:text-xl text-gray-600 leading-relaxed">
                            <p>
                                <span className="font-semibold text-gray-800">RISO</span> is registered as a Non-profit organization (NGO) based in Pune, Maharashtra (INDIA).
                                RISO is registered under section 25 of the Companies act of 1956.
                            </p>
                            <p>
                                Rostrum India Social Organization is an initiative triggered by the
                                alliance of the youth from all sections of our society.
                            </p>
                        </div>

                        <div className="mt-8 md:mt-10">
                            <Button
                                className="h-12 md:h-14 px-8 text-base md:text-lg font-semibold rounded-full bg-blue-900 hover:bg-blue-800 text-white shadow-lg hover:shadow-blue-900/30 transition-all duration-300 group"
                            >
                                Read More
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

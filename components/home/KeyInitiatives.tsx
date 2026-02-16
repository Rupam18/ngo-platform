"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Added Link for Button navigation

const initiatives = [
    {
        id: 1,
        title: "Education",
        image: "https://placehold.co/600x400/png?text=Education",
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "Healthcare",
        image: "https://placehold.co/600x400/png?text=Health",
        color: "bg-green-500",
    },
    {
        id: 3,
        title: "Environment",
        image: "https://placehold.co/600x400/png?text=Environment",
        color: "bg-teal-500",
    },
    {
        id: 4,
        title: "Livelihood",
        image: "https://placehold.co/600x400/png?text=Livelihood",
        color: "bg-yellow-500",
    },
];

export default function KeyInitiatives() {
    return (
        <section className="py-24 bg-[#1e3a8a] overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* LEFT: 2x2 Image Grid (Responsive: 1 col mobile, 2 cols tablet/desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {initiatives.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.5,
                                ease: "easeOut",
                            }}
                            className="relative aspect-square rounded-[20px] overflow-hidden shadow-lg group"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Subtle hover overlay (optional, for polish) */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>

                {/* RIGHT: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white space-y-8"
                >
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-blue-800/50 border border-blue-700/50 text-yellow-400 font-bold tracking-wider uppercase text-sm mb-4 backdrop-blur-sm"
                        >
                            Our Focus Areas
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Explore Our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                                Key Initiatives
                            </span>
                        </h2>
                    </div>

                    <p className="text-blue-100 text-lg md:text-xl leading-relaxed max-w-xl opacity-90">
                        Discover the programs that drive meaningful change in our communities.
                        We are dedicated to fostering sustainable growth through education,
                        healthcare, environmental stewardship, and livelihood support.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block"
                    >
                        <Link href="/initiatives">
                            <Button
                                className="h-16 px-10 text-lg font-bold rounded-full bg-white text-blue-900 hover:bg-blue-50 hover:text-blue-800 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 group"
                            >
                                Explore Now
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stat or extra info */}
                    <div className="flex items-center gap-8 pt-4 border-t border-blue-800/50">
                        <div>
                            <div className="text-3xl font-bold text-yellow-400">15+</div>
                            <div className="text-sm text-blue-200">Active Programs</div>
                        </div>
                        <div className="w-px h-10 bg-blue-800/50" />
                        <div>
                            <div className="text-3xl font-bold text-yellow-400">10k+</div>
                            <div className="text-sm text-blue-200">Lives Impacted</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

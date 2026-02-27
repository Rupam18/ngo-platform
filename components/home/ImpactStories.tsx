"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stories = [
    {
        id: 1,
        title: "From Struggle to School: Ayan's Journey",
        description: "Ayan, a 9-year-old child, struggled to attend school due to lack of nutrition and support. Through RISO's Educare program, he now receives education, meals, and mentorship, helping him rebuild his future and confidence.",
        image: "/education.jpg", // Placeholder - real image would be better
        videoLink: "#",
        featured: true
    },
    {
        id: 2,
        title: "Books to Dreams: Rural Library Transformation",
        description: "Through RISO Library initiative, children in rural villages gained access to books, learning spaces, and digital literacy support, fostering creativity, confidence, and lifelong learning opportunities.",
        image: "/library.jpg", // Placeholder
        videoLink: "#",
        featured: true
    }
];

export default function ImpactStories() {
    return (
        <section className="relative py-12 md:py-16 bg-slate-900 overflow-hidden">
            {/* Background with Dark Blue Gradient Overlay & Blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/95 to-slate-900 z-0" />

            {/* Subtle floating shapes */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-3 block">
                        Our Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                        Impact <span className="text-yellow-400">Stories</span>
                    </h2>
                    <p className="text-lg text-blue-100/80 max-w-2xl mx-auto font-light">
                        Real stories of change and transformation
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-6" />
                </motion.div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col group-hover:-translate-y-2">

                                {/* Image / Video Thumbnail Section */}
                                <div className="relative h-64 overflow-hidden w-full bg-slate-800">
                                    {/* Blurred Background */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={story.image}
                                            alt={story.title}
                                            fill
                                            className="object-cover opacity-20 blur-2xl scale-125"
                                        />
                                    </div>

                                    {/* Main Image */}
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        fill
                                        className="object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    {/* Overlay Gradient (Subtle) */}
                                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                                    {/* Featured Badge */}
                                    {story.featured && (
                                        <div className="absolute top-4 left-4 z-30 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                            <Star size={10} fill="white" /> FEATURED STORY
                                        </div>
                                    )}

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-75" />
                                            <div className="relative w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                                                    <Play size={20} className="ml-1 text-blue-600 fill-blue-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors">
                                        {story.title}
                                    </h3>

                                    <p className="text-blue-100/70 text-sm leading-relaxed mb-6 flex-grow">
                                        {story.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link href={story.videoLink} className="inline-flex items-center text-blue-400 font-bold text-sm tracking-wide group/link hover:text-white transition-colors uppercase">
                                            Read More
                                            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/link:translate-x-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

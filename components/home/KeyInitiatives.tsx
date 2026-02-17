"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, ArrowLeft, BookOpen, HeartPulse, ShieldCheck, Users, Target, Globe } from "lucide-react";
import Link from "next/link";

// --- Data ---
const whatWeDo = [
    {
        id: 1,
        title: "Education Support",
        icon: BookOpen,
    },
    {
        id: 2,
        title: "Environmental Care",
        icon: Globe,
    },
    {
        id: 3,
        title: "Women Empowerment",
        icon: ShieldCheck,
    },
    {
        id: 4,
        title: "Community Dev",
        icon: Users,
    },
];

const initiatives = [
    {
        id: 1,
        title: "Educare Program",
        description: "Providing quality education and digital literacy to underprivileged children in rural areas.",
        image: "https://placehold.co/600x400/png?text=Educare",
        category: "EDUCATION",
        color: "bg-blue-600",
        sdg: "SDG 4",
    },
    {
        id: 2,
        title: "RISO Library",
        description: "Building community libraries to foster a culture of reading and lifelong learning.",
        image: "https://placehold.co/600x400/png?text=Library",
        category: "LITERACY",
        color: "bg-yellow-500",
        sdg: "SDG 4",
    },
    {
        id: 3,
        title: "Healthy Child",
        description: "Comprehensive healthcare and nutrition support for children to combat malnutrition.",
        image: "https://placehold.co/600x400/png?text=Healthcare",
        category: "HEALTHCARE",
        color: "bg-red-600",
        sdg: "SDG 3",
    },
    {
        id: 4,
        title: "Green Earth",
        description: "Planting trees and promoting sustainable farming practices for a greener future.",
        image: "https://placehold.co/600x400/png?text=Green+Earth",
        category: "ENVIRONMENT",
        color: "bg-green-600",
        sdg: "SDG 13",
    },
    {
        id: 5,
        title: "Women Rise",
        description: "Skill development and financial independence workshops for women in urban slums.",
        image: "https://placehold.co/600x400/png?text=Women+Rise",
        category: "EMPOWERMENT",
        color: "bg-purple-600",
        sdg: "SDG 5",
    },
];

export default function KeyInitiatives() {
    // --- State for Carousel ---
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scroll
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % (initiatives.length - 2)); // Ensure we don't scroll past last full set? 
            // Better logic: Infinite loop or reset.
            // Simplified: Just loop back to 0. 
            // For simple implementation with 3 visible, max index is length-3.
            // If we want infinite loop, we need complex logic.
            // Let's stick to simple "scroll to end then reset" for robustness within constraints.
            // Actually, (prev + 1) % (initiatives.length - 2) creates a jump. 
            // Let's just do: if at end, go to 0.
            setCurrent(prev => {
                if (prev >= initiatives.length - 3) return 0;
                return prev + 1;
            });
        }, 4000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const nextSlide = () => {
        setCurrent(prev => (prev >= initiatives.length - 3 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent(prev => (prev === 0 ? initiatives.length - 3 : prev - 1));
    };

    return (
        <section className="bg-gray-50 overflow-hidden">

            {/* --- SECTION 1: WHAT WE DO --- */}
            <div className="py-20 relative">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                            Our Impact Model
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            What We Do?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our core programs designed for real community impact, focusing on the pillars of sustainable development.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {whatWeDo.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                                className="flex flex-col items-center group cursor-pointer"
                            >
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center mb-6 group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] transition-all duration-300 border border-gray-100 group-hover:border-blue-100 relative overflow-hidden">
                                    {/* Glassy overlay on hover */}
                                    <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/30 transition-colors duration-300 rounded-full" />

                                    <item.icon className="w-10 h-10 md:w-12 md:h-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                                    {item.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: KEY INITIATIVES (Slider) --- */}
            <div className="py-20 md:py-28 bg-white relative">
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                Our Key Initiatives
                            </h2>
                            <p className="text-lg text-gray-500 font-medium">
                                Connected to UN Sustainable Development Goals
                            </p>
                        </motion.div>

                        {/* Arrows */}
                        <div className="flex gap-4">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Carousel Track */}
                    <div
                        className="overflow-hidden -mx-4 px-4 py-8"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <motion.div
                            className="flex gap-6 md:gap-8"
                            animate={{ x: `-${current * (100 / 3) + (current * 0)}%` }} // Simplified for explicit widths
                            // Actually, with gap, calculating percentage is tricky. 
                            // Better to use a fixed width calculation or layout ref.
                            // But for "3 visible", we can treat 3 items as 100%. 
                            // Let's use flex-basis logic.
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* 
                                Logic Update: 
                                To show 3 items perfectly with gap, we usually do `calc((100% - 2 * gap) / 3)`.
                                But moving the track by percent needs careful calculation.
                                Easier approach: Just animate x with pixel values, or simpler percentage if we assume container fits exactly 3.
                                Let's assume standard CSS Grid or Flex with percentage move.
                                `min-width: calc(100% / 1)` on mobile.
                                `min-width: calc((100% - 16px) / 2)` on tablet.
                                `min-width: calc((100% - 48px) / 3)` on desktop.
                             */}
                            <div className="flex gap-6 w-full md:w-[200%] lg:w-[100%] transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${current * (100 / (initiatives.length > 3 ? 3 : 1))}%)` }}>
                                {/* Using standard style transform for reliability with complex calc */}
                            </div>
                            {/* Re-doing the loop structure to be safer with framer motion animate prop directly */}
                        </motion.div>

                        {/* 
                           Restarting the implementation of the slider logic to be robust. 
                           We will use a simple window of items.
                        */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {[0, 1, 2].map((offset) => {
                                    const index = (current + offset) % initiatives.length;
                                    const item = initiatives[index];
                                    return (
                                        <motion.div
                                            key={`${item.id}-${index}`} // unique key for animations
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }} // This creates a "slide" effect naturally
                                            transition={{ duration: 0.5 }}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                                        >
                                            {/* Image Top */}
                                            <div className="relative h-56 overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white tracking-wider uppercase shadow-sm ${item.color}`}>
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600 mb-6 line-clamp-3 text-sm md:text-base flex-grow">
                                                    {item.description}
                                                </p>

                                                {/* Bottom Row */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                                    <div className="flex items-center gap-2">
                                                        <Target size={16} className="text-green-600" />
                                                        <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">{item.sdg}</span>
                                                    </div>
                                                    <Link href="#" className="text-blue-600 font-semibold text-sm flex items-center hover:translate-x-1 transition-transform">
                                                        Explore Program <ArrowRight size={16} className="ml-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-12 gap-2">
                        {Array.from({ length: initiatives.length - 2 }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${current === idx ? "w-8 bg-blue-600" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

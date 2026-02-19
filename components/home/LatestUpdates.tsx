"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const updates = [
    {
        id: 1,
        category: "EDUCATION",
        date: "November 15, 2025",
        title: "RISO Library Opens 50th Reading Center",
        description: "Expanding access to quality books and learning resources for children in rural areas.",
        image: "/library.jpg",
        badgeGradient: "from-blue-500 to-indigo-600"
    },
    {
        id: 2,
        category: "HEALTH",
        date: "November 20, 2025",
        title: "Mobile Health Camps Reach 10,000+ Beneficiaries",
        description: "Providing essential healthcare services and medical check-ups in remote villages.",
        image: "/community-development.jpg",
        badgeGradient: "from-red-500 to-rose-600"
    },
    {
        id: 3,
        category: "EMPOWERMENT",
        date: "December 5, 2025",
        title: "Women Skill Development Program",
        description: "Empowering women with vocational training and entrepreneurship opportunities.",
        image: "/women.avif",
        badgeGradient: "from-purple-500 to-fuchsia-600"
    },
    {
        id: 4,
        category: "ENVIRONMENT",
        date: "December 10, 2025",
        title: "Green Earth Initiative",
        description: "Promoting plantation drives and climate awareness campaigns in communities.",
        image: "/environmentalcare.jpg",
        badgeGradient: "from-emerald-500 to-green-600"
    },
    {
        id: 5,
        category: "COMMUNITY",
        date: "December 22, 2025",
        title: "Volunteer Drive: 500+ New Volunteers Joined",
        description: "Strengthening grassroots outreach through active volunteer participation.",
        image: "/community-development.jpg", // Using relevant community image
        badgeGradient: "from-amber-500 to-orange-600"
    },
    {
        id: 6,
        category: "PARTNERSHIP",
        date: "January 5, 2026",
        title: "New CSR Partnership with Tech Company",
        description: "Strategic collaboration to scale digital literacy programs across India.",
        image: "/education.jpg",
        badgeGradient: "from-cyan-500 to-blue-600"
    }
];

export default function LatestUpdates() {
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(updates.length / itemsPerPage);

    const nextSlide = useCallback(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    }, [totalPages]);

    const prevSlide = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(nextSlide, 5000);
            return () => clearInterval(timer);
        }
    }, [isPaused, nextSlide]);


    const getVisibleItems = () => {
        const startIndex = currentPage * itemsPerPage;
        return updates.slice(startIndex, startIndex + itemsPerPage);
    };

    return (
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute -left-20 top-40 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-20 bottom-40 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                        Recent News
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
                        Latest <span className="text-yellow-500">Updates</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Stay informed about our recent activities and impact
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6 shadow-lg shadow-blue-500/20" />
                </motion.div>

                {/* Carousel */}
                <div
                    className="relative group/carousel px-4 md:px-12"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Arrows (Floating) */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-30 p-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl text-slate-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 border border-white/50 group-hover/carousel:opacity-100 opacity-0 md:opacity-100 disabled:opacity-50"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-30 p-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl text-slate-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 border border-white/50 group-hover/carousel:opacity-100 opacity-0 md:opacity-100 disabled:opacity-50"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>

                    {/* Cards Container */}
                    <div className="flex gap-8 justify-center min-h-[500px]">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="flex gap-8 w-full justify-center"
                            >
                                {getVisibleItems().map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] flex-shrink-0"
                                    >
                                        <div className="h-full bg-white/80 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 flex flex-col group relative hover:-translate-y-2">

                                            {/* Hover Glow Border */}
                                            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                                            {/* Image Section */}
                                            <div className="relative h-64 overflow-hidden z-10 rounded-t-[20px] bg-gray-100 group-hover:bg-gray-200 transition-colors">
                                                {/* Blurred Background Layer for "Fill" effect */}
                                                <div className="absolute inset-0 z-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover opacity-30 blur-xl scale-110"
                                                    />
                                                </div>

                                                {/* Main Image - Contained & Full Visible */}
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain relative z-10 p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                                                />

                                                {/* Category Badge */}
                                                <div className={`absolute top-5 left-5 z-20 px-4 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-lg bg-gradient-to-r ${item.badgeGradient} group-hover:brightness-110 transition-all transform group-hover:scale-105`}>
                                                    {item.category}
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-8 flex flex-col flex-grow relative z-10 bg-white/50 group-hover:bg-white/80 transition-colors duration-300">

                                                {/* Date */}
                                                <div className="flex items-center text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">
                                                    <Calendar size={14} className="mr-2 text-blue-500" />
                                                    {item.date}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                                    {item.description}
                                                </p>

                                                {/* CTA Button */}
                                                <div className="mt-auto">
                                                    <Link href="#" className="inline-flex items-center text-blue-600 font-bold text-sm tracking-wide group/link hover:text-blue-800 transition-colors uppercase py-2">
                                                        Explore Program
                                                        <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/link:translate-x-2" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-12 gap-3">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx)}
                                className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentPage
                                    ? "w-10 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md scale-110"
                                    : "w-2.5 bg-slate-300 hover:bg-slate-400 hover:scale-110"
                                    }`}
                                aria-label={`Go to page ${idx + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

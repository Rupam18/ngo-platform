"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";



const slides = [
    {
        id: 1,
        image: "/without text-1.png",
        title: "Transforming Lives Through Education, Health & Dignity",
    },
    {
        id: 2,
        image: "/withouttxt.jpg",
        title: "Give Every Child A Chance To Dream",
    },
    {
        id: 3,
        image: "/Image.jpg",
        title: "Together We Can Change Lives",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    // Auto-play functionality - 5s
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative w-full h-[90vh] overflow-hidden bg-gray-900 group">

            {/* 1. BACKGROUND LAYER (Images) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }} // Smooth crossfade
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Image with Zoom Effect */}
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.08 }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={slides[current].image}
                            alt={slides[current].title}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>

                    {/* Overlay - Gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* 2. STATIC CONTENT LAYER (Buttons & Subtitle stay, Title Animate) */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto flex flex-col items-center">

                    {/* Animated Title */}
                    <div className="min-h-[160px] md:min-h-[200px] flex items-center justify-center mb-4">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={current}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }} // Optional: exit animation to make it smooth
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl leading-tight"
                            >
                                {slides[current].title}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    {/* Static Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto drop-shadow-md font-light mb-10 leading-relaxed opacity-90"
                    >
                        Empowering underserved communities through impactful programs aligned with the UN Sustainable Development Goals.
                    </motion.p>

                    {/* Static Buttons (Persistent) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
                    >
                        {/* Primary Button: Donate (Yellow) */}
                        <Link
                            href="/donate"
                            className="group relative inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-xl px-8 py-4 shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg tracking-wide uppercase"
                        >
                            Donate
                        </Link>

                        {/* Secondary Button: Volunteer (Blue) */}
                        <Link
                            href="/volunteer"
                            className="group relative inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-4 shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg tracking-wide uppercase border border-blue-500/30"
                        >
                            Volunteer
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* 3. NAVIGATION (Static) */}
            <button
                onClick={prevSlide}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 border border-white/10"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 border border-white/10"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-3 rounded-full transition-all duration-500 ${current === idx ? "bg-yellow-400 w-10 shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "bg-white/30 w-3 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}

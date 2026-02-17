"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
    {
        id: 1,
        image: "/without text-1.png",
        text: "Transforming Lives Through Education, Health & Dignity",
        highlights: ["Education", "Health", "Dignity"],
    },
    {
        id: 2,
        image: "/withouttxt.jpg",
        text: "Give Every Child A Chance To Dream",
        highlights: ["Every Child"],
    },
    {
        id: 3,
        image: "/Image.jpg",
        text: "Together We Can Change Lives",
        highlights: ["Change Lives"],
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

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, [nextSlide]);

    // Helper to render title with highlights
    const renderTitle = (text: string, highlights: string[]) => {
        if (!highlights || highlights.length === 0) return text;

        // Escape regex special characters
        const pattern = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
        const parts = text.split(pattern);

        return parts.map((part, i) => {
            if (highlights.includes(part)) {
                return (
                    <span
                        key={i}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 drop-shadow-[0_2px_10px_rgba(253,224,71,0.3)]"
                    >
                        {part}
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-900 group">

            {/* 1. BACKGROUND LAYER (Cinematic Zoom) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.15 }} // Slower, deeper zoom
                        transition={{ duration: 12, ease: "linear" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={slides[current].image}
                            alt="Hero Image"
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 768px) 100vw, 100vw"
                        />
                    </motion.div>

                    {/* Gradient Overlay for Text Readability - Much lighter to show image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* 2. CONTENT LAYER */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto h-full pt-32 md:pt-20">
                <div className="max-w-5xl w-full">

                    <div className="relative">
                        {/* Remove the blurring container to keep image crisp */}
                        {/* <div className="absolute -inset-6 md:-inset-10 -z-10 bg-black/10 rounded-[3rem] hidden md:block" /> */}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -30, scale: 1.05 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col items-start gap-6 md:gap-8"
                            >
                                {/* Premium Headline with Strong Shadow for Readability without Background Box */}
                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-blue-200 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                                    {renderTitle(slides[current].text, slides[current].highlights)}
                                </h1>

                                {/* Subtitle with Shadow */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="text-lg md:text-2xl text-blue-50 font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                >
                                    Empowering underserved communities through impactful programs aligned with the UN Sustainable Development Goals.
                                </motion.p>

                                {/* Buttons Container */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-4"
                                >
                                    {/* Donate Button */}
                                    <Link href="/donate" className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
                                        <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-950 font-bold rounded-full px-10 py-5 shadow-2xl flex items-center justify-center gap-3 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 uppercase tracking-wide text-lg md:text-xl">
                                            Donate Now
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>

                                    {/* Volunteer Button */}
                                    <Link href="/volunteer">
                                        <div className="relative overflow-hidden bg-white/10 hover:bg-white/20 text-white font-bold rounded-full px-10 py-5 shadow-xl flex items-center justify-center gap-3 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 uppercase tracking-wide text-lg md:text-xl border border-white/20 backdrop-blur-md">
                                            Be a Volunteer
                                        </div>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* 3. NAVIGATION CONTROLS */}
            <div className="absolute bottom-12 right-12 z-30 hidden lg:flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 group"
                >
                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="flex gap-3 items-center px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/5">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-2.5 rounded-full transition-all duration-500 ${current === idx ? "bg-yellow-400 w-10 shadow-[0_0_15px_rgba(250,204,21,0.6)]" : "bg-white/30 w-2.5 hover:bg-white/50"}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 group"
                >
                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Mobile Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 lg:hidden flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${current === idx ? "bg-yellow-400 w-8 shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "bg-white/30 w-2"}`}
                    />
                ))}
            </div>
        </section>
    );
}

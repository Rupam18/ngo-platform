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

    // Auto-play functionality - increased duration for better reading
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden bg-gray-900 group">

            {/* 1. BACKGROUND LAYER (Cinematic Zoom) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }} // Slower, smoother fade
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Cinematic Zoom Effect (Slow Pan) */}
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.1 }}
                        transition={{ duration: 15, ease: "linear" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={slides[current].image}
                            alt={slides[current].title}
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        />
                    </motion.div>

                    {/* Cinematic Overlay - Left Gradient & Slight Darken */}
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* 2. CONTENT LAYER */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-4 md:px-12 max-w-7xl mx-auto h-full">
                <div className="max-w-4xl w-full flex flex-col items-center lg:items-start pt-16 lg:pt-0">

                    {/* Animated Headline */}
                    <div className="min-h-[140px] sm:min-h-[180px] md:min-h-[240px] flex items-center justify-center lg:justify-start mb-6 w-full">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={current}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight w-full drop-shadow-2xl"
                            >
                                {slides[current].title.split(" ").map((word, i) => {
                                    // Staggered Animation for each word
                                    const cleanWord = word.replace(/[^a-zA-Z]/g, "");
                                    let colorClass = "text-white";
                                    if (cleanWord === "Education") colorClass = "text-blue-400";
                                    if (cleanWord === "Health") colorClass = "text-green-400";
                                    if (cleanWord === "Dignity") colorClass = "text-yellow-400";

                                    return (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.05 }} // Stagger delay
                                            className={`inline-block mr-2 or-3 ${colorClass}`}
                                            // Add glow to special words
                                            style={colorClass !== "text-white" ? { textShadow: "0 0 20px rgba(255,255,255,0.3)" } : {}}
                                        >
                                            {word}
                                        </motion.span>
                                    );
                                })}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    {/* Subtitle with Glassmorphism Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-10 lg:mb-12 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <p className="text-sm sm:text-lg md:text-xl text-blue-50 font-light leading-relaxed drop-shadow-md lg:bg-black/20 lg:backdrop-blur-sm lg:p-4 lg:rounded-xl lg:border lg:border-white/10">
                            Empowering underserved communities through impactful programs aligned with the UN Sustainable Development Goals.
                        </p>
                    </motion.div>

                    {/* Premium CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-4 sm:px-0"
                    >
                        {/* Donate - Glowing Effect */}
                        <Link href="/donate" className="relative group w-full sm:w-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                            <div className="relative bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-xl px-10 py-4 shadow-xl flex items-center justify-center gap-2 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 uppercase tracking-wide text-lg">
                                Donate Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Volunteer - Glass/Outline Effect */}
                        <Link href="/volunteer" className="w-full sm:w-auto">
                            <div className="relative bg-blue-600/90 hover:bg-blue-600 text-white font-bold rounded-xl px-10 py-4 shadow-xl flex items-center justify-center gap-2 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 uppercase tracking-wide text-lg border border-blue-400/30 backdrop-blur-sm hover:shadow-blue-500/30">
                                Be a Volunteer
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* 3. NAVIGATION CONTROLS */}
            <div className="absolute bottom-8 right-8 z-30 hidden lg:flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-4 rounded-full border border-white/20 bg-black/20 hover:bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div className="flex gap-2 items-center">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${current === idx ? "bg-yellow-400 w-8" : "bg-white/30 w-2 hover:bg-white/50"}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="p-4 rounded-full border border-white/20 bg-black/20 hover:bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 group"
                >
                    <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            {/* Mobile Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden flex gap-3">
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

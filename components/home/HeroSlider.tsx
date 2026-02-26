"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
        image: "/education02.jpg",
        text: "Give Every Child A Chance To Dream",
        highlights: ["Every Child"],
    },
    {
        id: 3,
        image: "/with-text-3.png",
        text: "Together We Can Change Lives",
        highlights: ["Change Lives"],
    },
];

// Animation Variants


const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: custom * 0.1
        }
    })
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const kenBurns: Variants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
        scale: 1.15,
        opacity: 1,
        transition: {
            scale: { duration: 10, ease: "linear" },
            opacity: { duration: 1.5, ease: "easeOut" }
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 1 }
    }
};

const glowAnimation: Variants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
            duration: 5,
            ease: "linear",
            repeat: Infinity
        }
    }
};

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

        const pattern = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|')})`, 'g');
        const parts = text.split(pattern);

        return parts.map((part, i) => {
            if (highlights.includes(part)) {
                return (
                    <motion.span
                        key={i}
                        variants={glowAnimation}
                        initial="initial"
                        animate="animate"
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-orange-400 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)] bg-[length:200%_auto]"
                    >
                        {part}
                    </motion.span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900 group">

            {/* 1. BACKGROUND LAYER (Cinematic Zoom) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    variants={kenBurns}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[current].image}
                        alt="Hero Image"
                        fill
                        className="object-cover object-left"
                        priority
                        sizes="(max-width: 768px) 100vw, 100vw"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* 2. CONTENT LAYER */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto h-full pt-20">
                <div className="max-w-5xl w-full"> {/* Increased max-width for more breathing room */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                            className="flex flex-col items-start gap-6 md:gap-8"
                        >
                            {/* Premium Headline */}
                            <motion.h1
                                variants={fadeInUp}
                                custom={0}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white drop-shadow-xl"
                            >
                                {renderTitle(slides[current].text, slides[current].highlights)}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                variants={fadeInUp}
                                custom={1}
                                className="text-lg md:text-xl text-blue-50/90 font-medium max-w-2xl leading-relaxed drop-shadow-md"
                            >
                                Empowering underserved communities through impactful programs aligned with the UN Sustainable Development Goals.
                            </motion.p>

                            {/* Buttons Container */}
                            <motion.div
                                variants={fadeInUp}
                                custom={2}
                                className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-6"
                            >
                                {/* Donate Button */}
                                <Link href="/donate" className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-950 font-bold rounded-full px-8 py-4 shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 uppercase tracking-wide text-base md:text-lg"
                                    >
                                        Donate Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.div>
                                </Link>

                                {/* Volunteer Button */}
                                <Link href="/volunteer">
                                    <motion.div
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative overflow-hidden bg-white/10 text-white font-bold rounded-full px-8 py-4 shadow-xl flex items-center justify-center gap-3 transition-all duration-300 uppercase tracking-wide text-base md:text-lg border border-white/20 backdrop-blur-md"
                                    >
                                        Be a Volunteer
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 3. NAVIGATION CONTROLS */}
            <div className="absolute bottom-12 right-12 z-30 hidden lg:flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 group"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="flex gap-3 items-center px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/5">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-2.5 rounded-full transition-all duration-500 ${current === idx ? "bg-yellow-400 w-10 shadow-[0_0_15px_rgba(250,204,21,0.6)]" : "bg-white/30 w-2.5 hover:bg-white/50"}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 group"
                    aria-label="Next Slide"
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
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

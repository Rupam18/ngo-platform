"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Import sponsor images from Sponsers directory
import sp1 from "@/Sponsers/sp1.png";
import sp2 from "@/Sponsers/sp2.jpg";
import sp3 from "@/Sponsers/sp3.png";
import sp4 from "@/Sponsers/sp4.png";
import sp5 from "@/Sponsers/sp5.png";
import sp6 from "@/Sponsers/sp6.png";
import sp7 from "@/Sponsers/sp7.png";
import sp8 from "@/Sponsers/sp8.png";

const sponsors = [
    { name: "Sponsor 1", logo: sp1 },
    { name: "Sponsor 2", logo: sp2 },
    { name: "Sponsor 3", logo: sp3 },
    { name: "Sponsor 4", logo: sp4 },
    { name: "Sponsor 5", logo: sp5 },
    { name: "Sponsor 6", logo: sp6 },
    { name: "Sponsor 7", logo: sp7 },
    { name: "Sponsor 8", logo: sp8 },
];

// Simple Counter for the footer stats
function SimpleCounter({ to }: { to: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

    useEffect(() => {
        if (inView) spring.set(to);
    }, [inView, spring, to]);

    return <motion.span ref={ref} className="font-bold text-blue-600">{display}</motion.span>;
}

// Floating Particle Component
const Particle = ({ delay }: { delay: number }) => {
    const [style, setStyle] = useState<any>(null);

    useEffect(() => {
        setStyle({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 50}px`,
            height: `${20 + Math.random() * 50}px`,
            randomX: Math.random() * 40 - 20,
            duration: 5 + Math.random() * 5
        });
    }, []);

    if (!style) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
                opacity: [0, 0.4, 0],
                y: -100,
                x: style.randomX
            }}
            transition={{
                duration: style.duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className="absolute rounded-full bg-blue-400/20 blur-xl"
            style={{
                top: style.top,
                left: style.left,
                width: style.width,
                height: style.height,
            }}
        />
    );
};

export default function CSRPartners() {
    // Duplicate list for continuous loop
    const smoothSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

    return (
        <section className="relative py-12 md:py-16 bg-white overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-[#0056A6] font-bold tracking-wider uppercase text-xs mb-4 border border-blue-100">
                        Trusted Partners
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-[#0056A6]">Trusted by Leading</span> <span className="text-[#900000]">CSR Partners</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Working together to create lasting social impact through sustainable development initiatives.
                    </p>
                    <div className="w-24 h-1.5 bg-[#0056A6] rounded-full mx-auto mt-6" />
                </motion.div>
            </div>

            {/* Seamless Marquee Container */}
            <div className="relative w-full z-10">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20" />

                {/* Moving Track */}
                <div className="flex w-max animate-premium-scroll py-10">
                    {smoothSponsors.map((partner, index) => (
                        <div
                            key={`${partner.name}-${index}`}
                            className="flex-shrink-0 w-[200px] md:w-[260px] mx-6"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    y: -8,
                                    boxShadow: "0 20px 40px -5px rgba(59, 130, 246, 0.25)"
                                }}
                                onMouseEnter={(e) => {
                                    const track = e.currentTarget.closest(".animate-premium-scroll") as HTMLElement;
                                    if (track) track.style.animationPlayState = "paused";
                                }}
                                onMouseLeave={(e) => {
                                    const track = e.currentTarget.closest(".animate-premium-scroll") as HTMLElement;
                                    if (track) track.style.animationPlayState = "running";
                                }}
                                className="group relative bg-white rounded-2xl p-8 h-40 flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                            >
                                {/* Shine Effect on Hover */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain p-2 transition-all duration-500 will-change-transform group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bonus Stat Line */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 relative z-10"
            >
                <div className="inline-flex flex-wrap items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-3 rounded-full border border-gray-100 shadow-sm text-slate-700 text-[13px] sm:text-sm md:text-base w-[90%] md:w-auto mt-4 bg-white">
                    <span>Proudly supported by</span>
                    <span className="text-lg md:text-xl font-bold text-[#0056A6]"><SimpleCounter to={50} />+</span>
                    <span>CSR partners across India</span>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                .animate-premium-scroll {
                    animation: scroll 60s linear infinite; 
                    /* Slower animation (60s) for premium feel */
                }
            `}</style>
        </section>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function PremiumImpactCircle() {
    // 1. Data with Gradient & Content
    const segments = [
        { id: "grad1", from: "#3B82F6", to: "#06B6D4", value: 34, label: "Education & Learning", description: "Supporting migrant and underprivileged children" },
        { id: "grad2", from: "#10B981", to: "#14B8A6", value: 28, label: "Nutrition & Health", description: "Providing essential healthcare and nutrition" },
        { id: "grad3", from: "#F59E0B", to: "#FCD34D", value: 12, label: "Libraries & Knowledge", description: "Fostering literacy and lifelong learning" },
        { id: "grad4", from: "#EF4444", to: "#F43F5E", value: 10, label: "Donation Support", description: "Directly funding impactful initiatives" },
        { id: "grad5", from: "#8B5CF6", to: "#D946EF", value: 9, label: "Women Empowerment", description: "Skill training and financial independence" },
        { id: "grad6", from: "#14B8A6", to: "#06B6D4", value: 7, label: "Environment", description: "Planting trees and promoting sustainability" },
    ];

    const radius = 90;
    const strokeWidth = 28;
    const circumference = 2 * Math.PI * radius;

    // 2. State for Hover Interaction
    const [activeSegment, setActiveSegment] = useState<any>(null);

    let offset = 0;

    return (
        <div className="flex items-center justify-center w-full relative mt-8 md:mt-16">

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-[340px] h-[340px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]"
            >
                {/* Soft Glow Aura Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-100/50 via-white/50 to-green-100/50 blur-3xl opacity-70 animate-pulse"></div>

                {/* Rotating SVG Circle (VERY Slow Rotation) */}
                <motion.svg
                    viewBox="0 0 240 240"
                    className="w-full h-full drop-shadow-2xl relative z-10"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: -90 }} // Static rotation
                >
                    {/* Define Gradients */}
                    <defs>
                        {segments.map((s) => (
                            <linearGradient key={s.id} id={s.id} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={s.from} />
                                <stop offset="100%" stopColor={s.to} />
                            </linearGradient>
                        ))}
                    </defs>

                    {/* Draw Segments */}
                    <g transform="translate(120,120)">
                        {segments.map((segment, index) => {
                            const strokeDasharray = `${(segment.value / 100) * circumference} ${circumference}`;
                            const isHovered = activeSegment?.id === segment.id;

                            const circle = (
                                <motion.circle
                                    key={index}
                                    r={radius}
                                    cx="0"
                                    cy="0"
                                    fill="transparent"
                                    stroke={`url(#${segment.id})`}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={-offset}
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    whileInView={{ strokeDasharray: strokeDasharray }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 1.5,
                                        delay: index * 0.3,
                                        ease: "easeOut",
                                    }}

                                    // 3. Hover Interactions
                                    onMouseEnter={() => setActiveSegment(segment)}
                                    onMouseLeave={() => setActiveSegment(null)}
                                    // Make stroke pop slightly on hover
                                    animate={{
                                        strokeWidth: isHovered ? strokeWidth + 6 : strokeWidth,
                                        filter: isHovered ? "drop-shadow(0 0 8px rgba(0,0,0,0.3))" : "none",
                                        scale: isHovered ? 1.02 : 1
                                    }}
                                    className="cursor-pointer transition-all duration-300 ease-out hover:opacity-100 opacity-90"
                                />
                            );
                            offset += (segment.value / 100) * circumference;
                            return circle;
                        })}
                    </g>
                </motion.svg>

                {/* 4. Center Dynamic Content (AnimatePresence for smooth swap) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 text-center">
                    <AnimatePresence mode="wait">
                        {activeSegment ? (
                            // HOVER STATE: Show Stats
                            <motion.div
                                key="stats"
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <h3 className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wide mb-1">
                                    {activeSegment.label}
                                </h3>
                                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2 drop-shadow-sm">
                                    {activeSegment.value}%
                                </h1>
                                <p className="text-xs md:text-sm text-gray-500 font-medium max-w-[180px] leading-relaxed">
                                    {activeSegment.description}
                                </p>
                            </motion.div>
                        ) : (
                            // DEFAULT STATE: Show Logo
                            <motion.div
                                key="logo"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-[58%] h-[58%] bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.05)] group"
                            >
                                <div className="relative w-[85%] h-[85%] animate-pulse-slow">
                                    <Image
                                        src="/RISO_LOGO_Final2.png"
                                        alt="RISO Logo"
                                        fill
                                        className="object-contain drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </motion.div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const programsData = [
    {
        id: "educare",
        tabLabel: "PROJECT EDUCARE",
        title: "Project Educare",
        quote: "“Education is not preparation for life; education is life itself.”",
        description: "Millions of migrant children in India face interrupted education due to seasonal and temporary migration. This disruption negatively impacts learning outcomes and limits long-term opportunities.",
        bullets: [
            "Supports children from migrant labour families",
            "Ensures access to basic and continuous education"
        ],
        image: "/educare.jpg",
        statValue: "500+",
        statLabel: "BENEFICIARIES HELPED"
    },
    {
        id: "library",
        tabLabel: "PROJECT LIBRARY",
        title: "Project Library",
        quote: "“A library is not a luxury but one of the necessities of life.”",
        description: "Establishing community libraries to foster reading habits, creativity, and lifelong learning among children and villagers who lack easy access to educational resources.",
        bullets: [
            "Creates accessible learning hubs in rural areas",
            "Promotes continuous learning and digital literacy"
        ],
        image: "/library.jpg",
        statValue: "10,000+",
        statLabel: "BOOKS DISTRIBUTED"
    },
    {
        id: "green_hat",
        tabLabel: "GREEN HAT",
        title: "Project Green Hat",
        quote: "“He that plants trees loves others beside himself.”",
        description: "Massive tree plantation drives and environmental workshops focusing on creating a greener future, raising awareness about climate change, and promoting biodiversity.",
        bullets: [
            "Large-scale tree plantation drives",
            "Community environmental workshops"
        ],
        image: "/environmentalcare.jpg",
        statValue: "50,000+",
        statLabel: "TREES PLANTED"
    },
    {
        id: "dhyan",
        tabLabel: "DHYAN SANKUL",
        title: "Dhyan Sankul",
        quote: "“Empowerment begins with mindful learning and mental wellness.”",
        description: "A comprehensive initiative dedicated to holistic development, academic support, and structured learning environments for vulnerable and mindful developmental growth.",
        bullets: [
            "Focuses on mental and holistic well-being",
            "Provides structured learning environments"
        ],
        image: "/education.jpg", // Safe fallback
        statValue: "1,200+",
        statLabel: "LIVES IMPACTED"
    },
    {
        id: "adhaar",
        tabLabel: "PROJECT ADHAAR",
        title: "Project Adhaar",
        quote: "“Giving is not just about making a donation, it is about making a difference.”",
        description: "Providing school kits and educational materials to underprivileged students through active donation drives and sustainable reuse initiatives.",
        bullets: [
            "Distribution of complete school kits",
            "Promotes sustainable recycling of resources"
        ],
        image: "/aadhar_1.jpg",
        statValue: "2,500+",
        statLabel: "SCHOOL KITS DONATED"
    },
    {
        id: "swayampurna",
        tabLabel: "PROJECT SWAYAMPURNA",
        title: "Project Swayampurna",
        quote: "“Self-reliance is the true key to continuous freedom and success.”",
        description: "Empowering adults and youth through vocational training, skill development, and self-sustainability initiatives to ensure lasting financial independence.",
        bullets: [
            "Vocational and skill training programs",
            "Fosters independence and self-reliance"
        ],
        image: "/community-development.jpg", // Safe fallback
        statValue: "3,000+",
        statLabel: "INDIVIDUALS EMPOWERED"
    },
];

export default function ProgramsSection() {
    const [activeTab, setActiveTab] = useState(programsData[0].id);

    const currentTabInfo = programsData.find((p) => p.id === activeTab) || programsData[0];

    return (
        <section className="pt-4 md:pt-8 pb-16 md:pb-20 bg-white relative overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-4 md:px-8">

                {/* Tabs Row */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 md:mb-10">
                    {programsData.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-md text-[11px] md:text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                                    ${isActive
                                        ? "bg-[#0056A6] text-white"
                                        : "bg-white text-slate-500 border border-gray-100 hover:text-[#0056A6]"
                                    }`}
                            >
                                {tab.tabLabel}
                                {!isActive && <div className="w-1 h-1 rounded-full bg-[#0056A6]" />}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-4 md:p-6 lg:p-8 border-l-[8px] border-[#0056A6] relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTabInfo.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full"
                        >

                            {/* Left Side (Text content) */}
                            <div className="w-full lg:w-1/2 bg-[#F4F9FF] rounded-[1.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">

                                {/* Top decorative blur circle */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0056A6]/10 rounded-full blur-[50px] -mr-10 -mt-20 z-0 pointer-events-none" />

                                <div className="relative z-10">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0056A6] mb-8 text-center">
                                        {currentTabInfo.title}
                                    </h2>

                                    {/* Quote Block */}
                                    <div className="mb-6 relative">
                                        <p className="italic text-slate-500 text-[15px] md:text-base font-medium leading-relaxed">
                                            {currentTabInfo.quote}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed mb-8">
                                        {currentTabInfo.description}
                                    </p>

                                    {/* Bullets */}
                                    <div className="space-y-3">
                                        {currentTabInfo.bullets.map((point, idx) => (
                                            <div key={idx} className="flex items-center gap-4 bg-[#E5EEF9] rounded-md p-3 px-4">
                                                <div className="flex-shrink-0 flex items-center justify-center">
                                                    <svg width="12" height="24" viewBox="0 0 12 24" fill="none" stroke="#0056A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M10 2 Q4 2 4 8 Q4 12 0 12 Q4 12 4 16 Q4 22 10 22" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm md:text-[15px] text-slate-700 font-medium">
                                                    {point}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side (Image + Stat) */}
                            <div className="w-full lg:w-1/2 flex flex-col rounded-[1.5rem] overflow-hidden group">
                                <div className="relative h-[250px] md:h-full min-h-[300px] w-full bg-gray-100 overflow-hidden">
                                    <Image
                                        src={currentTabInfo.image}
                                        alt={currentTabInfo.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>

                                <div className="bg-[#0056A6] text-center py-8 px-6 relative overflow-hidden">
                                    <div className="text-4xl md:text-5xl font-extrabold mb-2 relative z-10 text-white">
                                        {currentTabInfo.statValue}
                                    </div>
                                    <div className="text-xs md:text-sm font-bold tracking-widest uppercase text-white relative z-10">
                                        {currentTabInfo.statLabel}
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

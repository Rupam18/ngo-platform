"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Users,
    Leaf,
    Heart,
    ArrowRight,
    ArrowLeft,
    Target,
    Recycle,
    Gift,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const whatWeDo = [
    {
        icon: <BookOpen size={32} />,
        title: "Education",
        description: "Empowering minds through quality learning and digital literacy.",
        color: "bg-blue-100 text-blue-600",
        image: "/education.jpg"
    },
    {
        icon: <Leaf size={32} />,
        title: "Environment",
        description: "Promoting sustainability through tree plantation and waste management.",
        color: "bg-green-100 text-green-600",
        image: "/environmentalcare.jpg"
    },
    {
        icon: <Users size={32} />,
        title: "Women Empowerment",
        description: "Creating opportunities for women to be self-reliant and financially independent.",
        color: "bg-pink-100 text-pink-600",
        image: "/women.avif"
    },
    {
        icon: <Heart size={32} />,
        title: "Community Health",
        description: "Providing healthcare services and awareness to underserved communities.",
        color: "bg-red-100 text-red-600",
        image: "/community-development.jpg"
    },
];

const keyInitiatives = [
    {
        id: 1,
        title: "RISO Library",
        category: "EDUCATION INITIATIVE",
        image: "/library.jpg",
        categoryColor: "from-blue-500 to-indigo-600",
        icon: <BookOpen size={18} />,
        shortDesc: "Establishing community libraries to foster reading habits, creativity, and lifelong learning among children and villagers.",
        fullDesc: "RISO Library is a community-driven initiative that aims to create accessible libraries in villages where people of all age groups can explore books based on their interests. It encourages children to learn reading habits, enjoy books, and develop curiosity and imagination. Reading plays a vital role in shaping initiative, originality, and character while also providing valuable knowledge and meaningful entertainment. Through this initiative, RISO strives to bring the joy of learning and the power of books to underserved communities and create a lasting impact on their lives."
    },
    {
        id: 2,
        title: "EDUCARE",
        category: "LITERACY INITIATIVE",
        image: "/educare.jpg",
        categoryColor: "from-amber-400 to-orange-500",
        icon: <BookOpen size={18} />,
        shortDesc: "Supporting migrant and underprivileged children with uninterrupted education and learning opportunities.",
        fullDesc: "Project EDUCARE addresses the educational challenges faced by migrant and underprivileged children whose schooling is disrupted due to seasonal migration. Despite the Right to Education (RTE) Act, 2009, many children lose access to continuous learning. Through focused educational support, learning resources, and community initiatives, RISO ensures uninterrupted education, reduces learning gaps, and helps break the intergenerational cycle of poverty by empowering children with knowledge and opportunities."
    },
    {
        id: 3,
        title: "NIRMITEE",
        category: "EMPOWERMENT / CSR INITIATIVE",
        icon: <Recycle size={18} />,
        image: "/community-development.jpg",
        categoryColor: "from-pink-500 to-rose-600",
        shortDesc: "Collecting and redistributing educational materials to support underprivileged students and promote sustainable learning.",
        fullDesc: "Project NIRMITEE is a social initiative by Team RISO focused on collecting old and new school stationery from society and redistributing it among students from underprivileged sections. The collected materials such as school bags, notebooks, pens, pencils, erasers, and other learning resources are carefully sorted and reused to support children’s education. Through active CSR drives in corporate sectors and educational institutions, RISO encourages individuals and organizations to donate usable educational materials. This initiative not only promotes sustainable reuse but also ensures that financially challenged students continue their education without resource barriers, empowering them with equal learning opportunities and a brighter future."
    },
    {
        id: 4,
        title: "Green Hat",
        description: "Massive tree plantation drives and environmental workshops for a greener future.",
        category: "ENVIRONMENT",
        image: "/environmentalcare.jpg",
        categoryColor: "from-emerald-500 to-green-600",
        icon: <Leaf size={18} />,
        shortDesc: "Massive tree plantation drives and environmental workshops for a greener future.",
        fullDesc: "Project Green Hat focuses on environmental conservation through large-scale tree plantation drives and educational workshops. We engage communities, schools, and corporate partners in planting trees, promoting biodiversity, and raising awareness about climate change and sustainable practices. Our goal is to create greener spaces, improve air quality, and foster a sense of environmental responsibility among all age groups. Through these initiatives, RISO aims to contribute to a healthier planet and a sustainable future for generations to come."
    },
    {
        id: 5,
        title: "ADHAAR",
        category: "EDUCATION SUPPORT",
        image: "/aadhar_1.jpg", // Moved from women.avif as this fits "school kits" better
        categoryColor: "from-blue-600 to-indigo-600",
        icon: <Gift size={18} />,
        shortDesc: "Providing school kits and educational materials to underprivileged students through donation drives and sustainable reuse initiatives.",
        fullDesc: "Project ADHAAR is a social initiative by Team RISO focused on collecting old and new school stationery from society and redistributing it to students from underprivileged sections. Donation drives are conducted across corporate sectors, educational institutions, and communities to gather materials such as school bags, notebooks, pens, pencils, erasers, and other learning essentials. These materials are sorted, refurbished, and converted into complete school kits which are then distributed to children in need. The initiative promotes sustainability, resource reuse, and equal access to education while encouraging community participation and social responsibility."
    },
];

export default function KeyInitiatives() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [expandedCards, setExpandedCards] = useState<number[]>([]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedCards(prev =>
            prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-6">

                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                        Our Impact Areas
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
                        What We <span className="text-yellow-500">Do</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Our core programs designed for real community impact.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto" />
                </motion.div>

                {/* --- WHAT WE DO (CIRCULAR IMPACT CARDS) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-28 justify-items-center">
                    {whatWeDo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative w-[260px] h-[260px] rounded-full overflow-hidden shadow-xl bg-white transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
                        >
                            {/* Hover Image Background */}
                            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>

                            {/* Default Gradient Overlay/Bg (Hidden on hover) */}
                            <div className={`absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-0 bg-gradient-to-br from-white to-gray-50`} />

                            {/* Content Container */}
                            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full p-6 transition-all duration-500">

                                {/* Icon (Fades out/up on hover) */}
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-8 ${item.color}`}>
                                    {item.icon}
                                </div>

                                {/* Title (Changes color on hover) */}
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300 relative group-hover:-translate-y-4">
                                    {item.title}
                                </h3>

                                {/* Description (Changes color on hover) */}
                                <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-200 transition-colors duration-300 relative group-hover:-translate-y-4 line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- KEY INITIATIVES (PREMIUM EXPANDABLE SLIDER) --- */}
                <div className="relative">
                    {/* Centered Premium Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16 px-4"
                    >
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                            Our Core Programs
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
                            Key <span className="text-yellow-500">Initiatives</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Projects driving real change and creating sustainable impact.
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6 shadow-lg shadow-blue-500/20" />
                    </motion.div>

                    {/* Navigation Arrows (Floating) */}
                    <button
                        onClick={scrollLeft}
                        className="absolute -left-2 md:-left-6 top-[60%] -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl text-slate-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 border border-white/50 group hidden md:block"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute -right-2 md:-right-6 top-[60%] -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl text-slate-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 border border-white/50 group hidden md:block"
                        aria-label="Next slide"
                    >
                        <ArrowRight size={24} strokeWidth={2.5} />
                    </button>

                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory px-2 items-stretch min-h-[500px]"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {keyInitiatives.map((initiative, index) => {
                            const isExpanded = expandedCards.includes(initiative.id);
                            const hasFullDesc = !!initiative.fullDesc;

                            return (
                                <motion.div
                                    layout // Makes expands smooth
                                    key={initiative.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    whileHover={!isExpanded ? { scale: 1.02, translateY: -8 } : {}}
                                    className={`group relative rounded-2xl p-8 overflow-hidden 
                                    bg-white/60 backdrop-blur-xl border border-white/60
                                    shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] 
                                    transition-all duration-500 snap-center cursor-pointer flex flex-col justify-between
                                    ${isExpanded ? 'min-w-[400px] md:min-w-[500px] bg-white ring-2 ring-blue-100' : 'min-w-[320px] md:min-w-[360px] h-[450px]'}
                                    `}
                                    onClick={() => hasFullDesc && toggleExpand(initiative.id)}
                                >
                                    {/* Background Image Reveal (Only on hover, hidden if expanded for readability) */}
                                    {!isExpanded && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-0 pointer-events-none bg-slate-900">
                                            {/* Blurred Background Fill */}
                                            <div className="absolute inset-0 z-0">
                                                <Image
                                                    src={initiative.image}
                                                    alt={initiative.title}
                                                    fill
                                                    className="object-cover opacity-40 blur-xl scale-110"
                                                />
                                            </div>

                                            {/* Main Image - Contained & Full Visible */}
                                            <Image
                                                src={initiative.image}
                                                alt={initiative.title}
                                                fill
                                                className="object-contain relative z-10 p-4 transition-transform duration-1000 group-hover:scale-105"
                                            />

                                            {/* Gradient Overlay for Text Visibility */}
                                            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
                                        </div>
                                    )}

                                    {/* Content Layer */}
                                    <div className="relative z-10 flex flex-col h-full">

                                        {/* Top: Badge & Icon */}
                                        <div className="flex justify-between items-start mb-6">
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                className={`inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase 
                                                bg-gradient-to-r ${initiative.categoryColor} 
                                                text-white rounded-full shadow-md border border-white/20`}
                                            >
                                                {initiative.category}
                                            </motion.span>

                                            <motion.div
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                                className={`w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-blue-600 shadow-sm transition-colors duration-300
                                                    ${!isExpanded ? 'group-hover:bg-white/20 group-hover:text-white' : ''}`}
                                            >
                                                {initiative.icon || <Target size={18} />}
                                            </motion.div>
                                        </div>

                                        {/* Middle: Text Content */}
                                        <div className="flex-grow space-y-4">
                                            <h3 className={`text-2xl font-bold transition-colors duration-300 drop-shadow-sm
                                                ${!isExpanded ? 'text-gray-900 group-hover:text-white' : 'text-gray-900 text-3xl mb-4'}
                                            `}>
                                                {initiative.title}
                                            </h3>

                                            {/* Short Description */}
                                            <p className={`text-sm leading-relaxed transition-colors duration-300
                                                ${!isExpanded ? 'text-gray-600 group-hover:text-gray-200 line-clamp-4' : 'text-gray-600 text-base'}
                                            `}>
                                                {initiative.shortDesc || initiative.description}
                                            </p>

                                            {/* Collapsible Full Description */}
                                            <AnimatePresence>
                                                {isExpanded && hasFullDesc && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-4 border-t border-gray-100 mt-4">
                                                            <p className="text-gray-700 leading-relaxed text-base">
                                                                {initiative.fullDesc}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Bottom: CTA */}
                                        <div className={`mt-6 pt-6 border-t transition-colors duration-300
                                            ${!isExpanded ? 'border-gray-100 group-hover:border-white/20' : 'border-gray-100'}
                                        `}>
                                            <div className="flex items-center justify-between">
                                                <button
                                                    className={`flex items-center gap-2 text-sm font-bold transition-colors duration-300 group/link
                                                        ${!isExpanded ? 'text-blue-600 group-hover:text-yellow-400' : 'text-blue-700'}
                                                    `}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (hasFullDesc) toggleExpand(initiative.id);
                                                    }}
                                                >
                                                    {isExpanded ? "Show Less" : "Read More"}
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} className={`${!isExpanded && 'group-hover/link:translate-y-0.5'} transition-transform`} />}
                                                </button>

                                                <Link href="/projects" onClick={(e) => e.stopPropagation()} className={`opacity-0 transition-opacity duration-500 delay-100 text-xs text-white/60 hover:text-white hover:underline
                                                    ${!isExpanded ? 'group-hover:opacity-100' : 'opacity-100 text-blue-400 hover:text-blue-600'}
                                                `}>
                                                    Explore Page →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glow Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/30 transition-colors duration-500 pointer-events-none z-20" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

"use client";

import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Image as ImageIcon, Video, Newspaper } from "lucide-react";

const mediaSections = [
    {
        title: "Media Images",
        description: "Explore our rich gallery showcasing on-the-ground volunteer work, community drives, and impactful NGO events.",
        href: "/media/images",
        image: "/environmentalcare.jpg",
        icon: ImageIcon,
        color: "bg-blue-600"
    },
    {
        title: "Latest News",
        description: "Stay updated with our latest press releases, announcements, CSR engagements, and upcoming campaigns.",
        href: "/media/news",
        image: "/community-development.jpg",
        icon: Newspaper,
        color: "bg-red-600"
    },
    {
        title: "Videos",
        description: "Watch inspiring stories, interviews, and deep-dive documentaries about the lives we've touched.",
        href: "/media/videos",
        image: "/educare.jpg",
        icon: Video,
        color: "bg-yellow-500"
    }
];

export default function MediaHubPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* 1. HERO SECTION (Aligned with Programs Page) */}
            <section className="relative w-full h-[280px] md:h-[350px] lg:h-[400px] overflow-hidden mb-12">
                <Image
                    src="/headerbanner-riso.jpg"
                    alt="Media Center Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 md:bg-black/60 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center px-4"
                    >
                        <span className="text-yellow-400 font-bold tracking-wider uppercase text-sm mb-3 block drop-shadow-md">
                            Media Center
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest uppercase drop-shadow-lg mb-4 mt-2">
                            Media
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-md hidden md:block">
                            Explore and share our journey as we work towards a brighter, more sustainable future together.
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mx-auto mt-6 shadow-lg shadow-black/50" />
                    </motion.div>
                </div>
            </section>

            {/* 3 Large Sections */}
            <section className="flex-grow max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-3 gap-8 md:gap-12 w-full place-items-start">
                {mediaSections.map((section, idx) => (
                    <Link href={section.href} key={section.title} className="block w-full h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group border border-gray-100 relative"
                        >
                            {/* Hover Outline */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-3xl transition-colors duration-500 pointer-events-none z-20" />

                            <div className="w-full relative h-[250px] overflow-hidden">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-80" />

                                {/* Icon Badge */}
                                <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${section.color}`}>
                                    <section.icon size={24} />
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-[15px]">
                                    {section.description}
                                </p>

                                <div className="mt-auto">
                                    <span className="inline-flex items-center gap-2 font-bold text-blue-600 group-hover:text-red-600 transition-colors">
                                        View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </section>

            <Footer />
        </main>
    );
}

"use client";

import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

const videos = [
    {
        id: 1,
        title: "Mission Healthy Child",
        thumbnail: "/med4.png", // Fallback thumbnail mapped closely to existing assets
        url: "https://youtu.be/LIZi4Nl-Two",
    },
    {
        id: 2,
        title: "RISO Library",
        thumbnail: "/med1.png", // Fallback thumbnail mapped closely to existing assets
        url: "https://youtu.be/S4mRDSIo38c",
    },
    {
        id: 3,
        title: "Joy Of Giving",
        thumbnail: "/med2.png", // Fallback thumbnail mapped closely to existing assets
        url: "https://youtu.be/bdnNzRio53A",
    }
];

export default function MediaVideosPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* Header */}
            <section className="pt-16 pb-12 text-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-sm mb-4">
                        Video <span className="text-red-600">Gallery</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience our journey through visual storytelling and documentaries.
                    </p>
                </motion.div>
            </section>

            {/* Video Layout Grid */}
            <section className="flex-grow max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
                {videos.map((video, index) => (
                    <motion.a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        whileHover={{ y: -12, scale: 1.03 }}
                        className="group relative"
                    >
                        {/* Glow Border */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400 rounded-3xl blur opacity-0 group-hover:opacity-60 transition duration-500"></div>

                        {/* Glass Card */}
                        <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">

                            {/* Image Container */}
                            <div className="relative w-full h-64 overflow-hidden">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />

                                {/* Dark Cinematic Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition duration-500"></div>

                                {/* Animated Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        className="relative"
                                    >
                                        {/* Ripple Effect */}
                                        <span className="absolute inset-0 rounded-full bg-white/30 animate-ping"></span>

                                        {/* Play Button */}
                                        <div className="relative bg-white/90 backdrop-blur-md p-5 rounded-full shadow-2xl border border-white/50">
                                            <svg
                                                className="w-10 h-10 text-red-600"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                                    {video.title}
                                </h3>

                                {/* Animated Underline */}
                                <div className="mt-3 h-1 w-12 bg-gradient-to-r from-blue-500 to-red-500 mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </section>

            <Footer />
        </main>
    );
}

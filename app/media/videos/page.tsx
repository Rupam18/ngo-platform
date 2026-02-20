"use client";

import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

const staticVideos = [
    {
        id: "v1",
        title: "RISO Annual Report Highlight 2025",
        youtubeId: "dQw4w9WgXcQ", // Replace with real NGO IDs
        thumbnail: "/environmentalcare.jpg", // Simulated thumbnail from standard assets
        duration: "03:45"
    },
    {
        id: "v2",
        title: "Voices from the Field: Project Educare",
        youtubeId: "dQw4w9WgXcQ",
        thumbnail: "/educare.jpg",
        duration: "05:20"
    },
    {
        id: "v3",
        title: "Women Empowerment Success Stories",
        youtubeId: "dQw4w9WgXcQ",
        thumbnail: "/women.avif",
        duration: "02:15"
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
            <section className="flex-grow max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-8 w-full">
                {staticVideos.map((video, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        key={video.id}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                    >
                        {/* Video Aspect Ratio Box */}
                        <div className="relative w-full aspect-video bg-gray-900 overflow-hidden group-hover:shadow-inner">
                            {/* Static Thumbnail Placeholder overlay to act as a play button */}
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg" />
                            </div>

                            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold font-mono">
                                {video.duration}
                            </div>
                        </div>

                        {/* Title block */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                                {video.title}
                            </h3>
                            <a
                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-4 text-sm font-bold text-red-600 hover:text-red-700 uppercase tracking-widest"
                            >
                                Watch on YouTube →
                            </a>
                        </div>
                    </motion.div>
                ))}
            </section>

            <Footer />
        </main>
    );
}

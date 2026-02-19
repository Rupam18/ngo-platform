"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                        Our Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-8">
                        Healthy Child, <span className="text-yellow-500">Healthy India</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-10" />

                    {/* Adjusted Video Container to match ~480px height on desktop while keeping aspect ratio */}
                    <div className="relative w-full max-w-[854px] mx-auto overflow-hidden rounded-2xl shadow-2xl aspect-video bg-gray-900 group">
                        {/* YouTube Embed */}
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/LIZi4Nl-Two"
                            title="Healthy Child, Healthy India"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                        {/* Optional Overlay if video is not autoplaying, simpler to just embed for now */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="text-blue-600 font-semibold tracking-wide uppercase">
                        Our Impact
                    </span>
                    <h2 className="mt-2 mb-8 text-3xl md:text-5xl font-bold text-gray-900">
                        Healthy Child, Healthy India
                    </h2>

                    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-video bg-gray-900 group">
                        {/* YouTube Embed */}
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder"
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

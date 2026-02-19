"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Placeholder images for the gallery
const galleryImages = [
    {
        src: "https://placehold.co/600x400/png?text=Event+1",
        alt: "Community Gathering",
        caption: "Community Gathering 2025"
    },
    {
        src: "https://placehold.co/600x400/png?text=Event+2",
        alt: "Education Drive",
        caption: "Education Drive - Pune"
    },
    {
        src: "https://placehold.co/600x400/png?text=Event+3",
        alt: "Healthcare Camp",
        caption: "Free Healthcare Camp"
    },
];

export default function EventsGallery() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-8 md:mb-12"
                >
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                        Captured Moments
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
                        Recent <span className="text-yellow-500">Activities</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative group h-80 w-full overflow-hidden rounded-xl shadow-lg cursor-pointer"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay with Caption */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.caption}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

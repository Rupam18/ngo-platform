"use client";

import { useState } from "react";
import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const mediaImages = [
    "/news1.jpg", "/news2.jpg", "/news3.jpg", "/news4.jpg",
    "/news5.png", "/news6.jpg", "/news7.png", "/news8.bmp",
    "/news9.jpg", "/news10.png", "/news11.jpg", "/news12.png",
    "/news13.jpg", "/news15.jpg", "/news16.jpg", "/news17.jpg",
    "/news19.jpg"
];

export default function MediaNewsPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* Header */}
            <section className="pt-16 pb-12 text-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-sm mb-4">
                        Latest <span className="text-red-600">News</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay informed about our latest milestones, announcements, and events.
                    </p>
                </motion.div>
            </section>

            {/* Clean Grid Section */}
            <section className="flex-grow max-w-7xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
                {mediaImages.map((image, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                        whileHover={{ y: -8 }}
                        onClick={() => setSelectedImage(image)}
                        className="relative w-full h-64 md:h-72 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                    >
                        <Image
                            src={image}
                            alt={`Media News ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        {/* Premium Gradient Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center pb-6">
                            <span className="text-white font-semibold text-lg tracking-wide backdrop-blur-sm px-4 py-2 rounded-full bg-white/10 border border-white/20">
                                View Image
                            </span>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Premium Image Popup Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white text-3xl font-bold hover:scale-110 transition"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>

                        {/* Image Container with Zoom Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 40 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative w-full max-w-5xl h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Preview"
                                fill
                                className="object-contain bg-black"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}

"use client";

import { useState } from "react";
import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Search } from "lucide-react";

// Robust Static Data fallback
const staticImages = [
    { id: 1, src: "/med4.png", category: "Events", title: "SAREE DISTRIBUTION" },
    { id: 2, src: "/med3.png", category: "Events", title: "SCHOOL KIT DISTRIBUTION" },
    { id: 3, src: "/med1.png", category: "Events", title: "NEERCHAKRA" },
    { id: 4, src: "/med2.png", category: "Health", title: "NISHARG-CYCLONE" },
    {id:5, src:"/WALL.jpg", category:"Education", title:"WALL BEAUTIFICATION ACTIVITY"}
];

const categories = ["All", "Events", "Education", "Health"];

export default function MediaImagesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const filteredImages = selectedCategory === "All"
        ? staticImages
        : staticImages.filter(img => img.category === selectedCategory);

    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50 relative">
            <StickyHeader />

            {/* Header */}
            <section className="pt-16 pb-10 text-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-sm mb-4">
                        Image <span className="text-red-600">Gallery</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A visual journey of our continuous efforts and social impact.
                    </p>
                </motion.div>
            </section>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 px-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border
                            ${selectedCategory === cat
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <section className="flex-grow max-w-7xl mx-auto px-6 pb-20 w-full">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredImages.map((img) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                key={img.id}
                                onClick={() => setLightboxImage(img.src)}
                                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
                            >
                                {/* Loading state handled automatically by next/image blur via css if setup, but using fast static images here */}
                                <Image
                                    src={img.src}
                                    alt={img.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/60 transition-colors duration-300 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
                                    <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <Search size={32} className="text-white mx-auto mb-2 opacity-80" />
                                        <h3 className="text-white font-bold px-4">{img.title}</h3>
                                        <p className="text-blue-200 text-sm">{img.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                            onClick={() => setLightboxImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh] rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Prevent close on image click
                        >
                            <Image
                                src={lightboxImage}
                                alt="Expanded view"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}

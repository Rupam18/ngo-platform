"use client";

import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import ProgramsSection from "@/components/programs/ProgramsSection";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProgramsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <StickyHeader />

            {/* Banner Section matching 'Our Work' visual */}
            <section className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
                <Image
                    src="/headerbanner-riso.jpg" // Safe fallback image that spans wide nicely
                    alt="Our Programs Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 md:bg-black/60 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest drop-shadow-lg uppercase">
                            Our Programs
                        </h1>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mx-auto mt-6 shadow-lg shadow-black/50" />
                    </motion.div>
                </div>
            </section>

            {/* Tabbed component representing the 'Our Work' core items */}
            <ProgramsSection />

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}

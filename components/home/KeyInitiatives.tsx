"use client";

import React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const initiatives = [
    { img: "https://placehold.co/400x400/png?text=Education", alt: "Education" },
    { img: "https://placehold.co/400x400/png?text=Health", alt: "Health" },
    { img: "https://placehold.co/400x400/png?text=Environment", alt: "Environment" },
    { img: "https://placehold.co/400x400/png?text=Livelihood", alt: "Livelihood" },
];

export default function KeyInitiatives() {
    return (
        <section className="py-20 bg-blue-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT: 2x2 Image Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {initiatives.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{ y: -10 }} // Hover lift effect
                            className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg group"
                        >
                            <Image
                                src={item.img}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </motion.div>
                    ))}
                </div>

                {/* RIGHT: Text Content */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-white"
                >
                    <span className="text-yellow-400 font-bold tracking-wider uppercase mb-2 block">
                        Our Focus
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        EXPLORE OUR <br /> KEY INITIATIVES
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                        Discover the programs that drive meaningful change in our communities.
                        From education to environment, we are committed to holistic development.
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            className="h-14 px-10 text-lg font-bold rounded-full bg-white text-blue-900 hover:bg-blue-50 shadow-xl"
                        >
                            EXPLORE NOW
                        </Button>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

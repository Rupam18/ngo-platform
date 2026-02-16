"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const works = [
    {
        title: "EDUCARE",
        image: "https://placehold.co/400x400/png?text=Educare",
        color: "border-blue-500",
    },
    {
        title: "NIRMITEE",
        image: "https://placehold.co/400x400/png?text=Nirmitee",
        color: "border-pink-500",
    },
    {
        title: "GREEN HAT",
        image: "https://placehold.co/400x400/png?text=Green+Hat",
        color: "border-green-500",
    },
];

export default function OurWork() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-blue-600 font-semibold tracking-wide uppercase">
                        Our Key Initiatives
                    </span>
                    <h2 className="mt-2 mb-12 text-3xl md:text-5xl font-bold text-gray-900">
                        Our Work
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12 justify-center">
                    {works.map((work, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center"
                        >
                            <div
                                className={`relative w-64 h-64 rounded-full overflow-hidden border-4 shadow-xl ${work.color} mb-6`}
                            >
                                <Image
                                    src={work.image}
                                    alt={work.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Optional Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">
                                {work.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

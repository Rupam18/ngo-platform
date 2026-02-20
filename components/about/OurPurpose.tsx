"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function OurPurpose() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* LEFT: IMAGE */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl"
                >
                    <Image
                        src="/aboutus01.png"
                        alt="Our Purpose"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* RIGHT: TEXT */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="space-y-6"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Our <span className="text-red-600">Purpose</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                    </div>

                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            We envision a world where every individual, regardless of their background, has access to basic necessities, quality education, and adequate healthcare. Our purpose is to bridge the gap between privilege and need.
                        </p>
                        <p>
                            Through strategic community interventions, we empower the marginalized to break the cycle of poverty and become self-reliant contributors to society. It is not just about giving; it is about enabling growth.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

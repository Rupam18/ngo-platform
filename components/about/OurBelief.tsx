"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function OurBelief() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* LEFT: TEXT */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 lg:order-1 order-2"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Our <span className="text-red-600">Belief</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full" />
                    </div>

                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            We firmly believe in the power of collective youth action. The youth of this country carries a tremendous potential to bring about scalable and constructive change in our communities.
                        </p>
                        <p>
                            True impact is driven by transparency, dedication, and the unwavering belief that a single act of kindness can trigger a ripple effect of positivity. Together, we can build a stronger, more equitable nation for future generations.
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT: IMAGE */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl lg:order-2 order-1"
                >
                    <Image
                        src="/aboutus02.png"
                        alt="Our Belief"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

            </div>
        </section>
    );
}

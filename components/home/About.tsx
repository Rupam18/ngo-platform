"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function About() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-blue-600 font-semibold tracking-wide uppercase">
                        Who We Are
                    </span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Driving Change through Compassion & Action
                    </h2>
                    <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                        Rostrum India Social Organization (RISO) is dedicated to uplifting
                        underprivileged communities through education, healthcare, and
                        sustainable development. We believe in the power of collective
                        action to create a better world.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Button className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700">
                            Read Our Story
                        </Button>
                        <Button variant="outline" className="h-12 px-8 text-lg">
                            Contact Us
                        </Button>
                    </div>
                </motion.div>

                {/* Image/Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Placeholder for About Image */}
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                        <Image
                            src="https://placehold.co/600x400/png"
                            alt="About Us"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

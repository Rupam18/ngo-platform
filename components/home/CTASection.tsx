"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
    return (
        <section
            className="relative py-16 md:py-20 bg-fixed bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/together.avif')" }} // Replace with actual 'hands raised' image
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-12 drop-shadow-xl"
                >
                    TOGETHER WE CAN <br /> <span className="text-yellow-400">IMPROVE THEIR LIVES</span>
                </motion.h2>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/volunteer">
                            <Button variant="secondary" size="lg" className="rounded-full">
                                Become Volunteer
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/donate">
                            <Button variant="primary" size="lg" className="rounded-full">
                                Donate Now
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

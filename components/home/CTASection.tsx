"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section
            className="relative py-32 bg-fixed bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/banner.png')" }} // Replace with actual 'hands raised' image
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-12 drop-shadow-lg"
                >
                    TOGETHER WE CAN <br /> IMPROVE THEIR LIVES
                </motion.h2>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            className="h-14 px-8 text-xl font-bold rounded-full bg-yellow-500 text-black hover:bg-yellow-400 border-none shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_rgba(234,179,8,0.8)] transition-all duration-300"
                        >
                            Become Volunteer
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            className="h-14 px-8 text-xl font-bold rounded-full bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] transition-all duration-300"
                        >
                            Donate Now
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

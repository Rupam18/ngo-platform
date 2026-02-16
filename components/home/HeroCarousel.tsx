"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroCarousel() {
    return (
        <div className="relative w-full h-[70vh] overflow-hidden">

            {/* Background Image with Slow Zoom Animation */}
            <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/banner.png')" }} // Replace with actual hero image path
            >
                <div className="absolute inset-0 bg-black/50" />
            </motion.div>

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

                {/* Main Text with Fade In */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-wide leading-snug drop-shadow-lg max-w-5xl"
                >
                    Health | Education | Employment <br className="hidden md:block" />
                    <span className="mt-2 inline-block">Awareness | Environment</span>
                </motion.h1>

                {/* Buttons with Hover Scale */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 flex flex-col sm:flex-row gap-6"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="outline"
                            className="h-14 px-8 text-xl font-semibold border-2 border-white text-white bg-transparent hover:bg-white hover:text-black rounded-full transition-colors"
                        >
                            Become Volunteer
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="h-14 px-8 text-xl font-semibold bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg">
                            Donate Now
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

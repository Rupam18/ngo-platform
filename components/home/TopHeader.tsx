"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TopHeader() {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white shadow-sm border-b border-gray-100 z-50 relative"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Left: Logo */}
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0">
                        <Image
                            src="/banner.png"
                            alt="RISO Logo"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Middle: Text */}
                    <div className="text-center md:text-left">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                            Rostrum India Social Organization
                        </h1>
                        <p className="text-sm md:text-base text-blue-600 font-medium italic">
                            Be Social... Be Special..!
                        </p>
                    </div>
                </div>

                {/* Right: Buttons */}
                <div className="flex flex-wrap justify-center gap-3 shrink-0">
                    <Button variant="outline" className="h-10 px-6 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold">
                        Donate In Kind
                    </Button>
                    <Button className="h-10 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md">
                        Donate Now
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

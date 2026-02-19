"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BookOpen, HeartPulse, Library, HandCoins, UserCheck, Leaf } from "lucide-react";
import Image from "next/image";
import PremiumImpactCircle from "./PremiumImpactCircle";

const data = [
    { name: "Education & Learning", value: 34, color: "#3B82F6", icon: BookOpen }, // Blue-500
    { name: "Nutrition & Health", value: 28, color: "#10B981", icon: HeartPulse }, // Emerald-500
    { name: "Libraries & Knowledge", value: 12, color: "#F59E0B", icon: Library }, // Amber-500
    { name: "Donation Support", value: 10, color: "#EF4444", icon: HandCoins }, // Red-500
    { name: "Women Empowerment", value: 9, color: "#8B5CF6", icon: UserCheck }, // Violet-500
    { name: "Environment", value: 7, color: "#14B8A6", icon: Leaf }, // Teal-500
];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    return null; // We use cards for labels
};

// Animated Counter Component
const CountUp = ({ to }: { to: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = to;
            const duration = 2000;
            const incrementTime = duration / end;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [inView, to]);

    return <span ref={ref}>{count}%</span>;
};

export default function ImpactAreas() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative z-0 mt-0 pt-[120px] pb-[120px] bg-gradient-to-b from-gray-50/50 via-white to-white overflow-hidden" id="impact">
            {/* Divider / Separation */}
            {/* <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /> */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 space-y-4"
                >
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                        Where We Focus
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                        RISO’s Key <span className="text-yellow-500">Impact Areas</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A clear overview of the areas where RISO creates lasting impact, driven by your generous support.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
                </motion.div>

                <div className="grid lg:grid-cols-[40%_60%] gap-6 items-center relative z-10">

                    {/* LEFT: Animated Donut Chart */}
                    <div className="relative h-[350px] md:h-[450px] w-full flex items-center justify-center order-1 relative z-0">
                        <PremiumImpactCircle />
                    </div>

                    {/* RIGHT: Impact Cards Container */}
                    <div className="relative z-20 bg-white/60 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-sm border border-white/50 order-2 lg:order-2">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {data.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    className={`
                                    relative p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer
                                    ${activeIndex === index ? 'ring-2 ring-offset-2 scale-[1.02]' : ''}
                                `}
                                    style={{
                                        // Dynamic border color on active
                                        borderColor: activeIndex === index ? item.color : 'transparent'
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-white transition-colors" style={{ color: item.color }}>
                                            <item.icon size={20} strokeWidth={2} />
                                        </div>
                                        <span className="text-xl font-bold" style={{ color: item.color }}>
                                            <CountUp to={item.value} />
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-gray-800 group-hover:text-black transition-colors text-sm">
                                        {item.name}
                                    </h3>

                                    {/* Progress Bar Background */}
                                    <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5 + (index * 0.1) }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section >
    );
}

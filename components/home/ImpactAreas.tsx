"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BookOpen, HeartPulse, Library, HandCoins, UserCheck, Leaf } from "lucide-react";
import Image from "next/image";

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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        RISO’s Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Impact Areas</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A clear overview of the areas where RISO creates lasting impact, driven by your generous support.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[40%_60%] gap-6 items-center relative z-10">

                    {/* LEFT: Animated Donut Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[350px] w-full flex items-center justify-center order-1 relative z-0"
                    >
                        {/* Glassmorphism Circle Background */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-full scale-90 blur-3xl -z-10" />

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={90}
                                    outerRadius={140}
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="name"
                                    cornerRadius={8}
                                    stroke="none"
                                    animationBegin={200}
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            style={{
                                                filter: activeIndex === index ? `drop-shadow(0 0 10px ${entry.color}80)` : 'none',
                                                transition: 'filter 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                            stroke={activeIndex === index ? "#fff" : "none"}
                                            strokeWidth={2}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                                    formatter={(value: any, name: any) => [`${value}%`, name]}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Center Logo/Text with Pulse */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                        >
                            <div className="w-24 h-24 relative mb-2">
                                <span className="absolute inset-0 border-2 border-blue-100 rounded-full animate-ping opacity-75"></span>
                                <div className="bg-white p-4 rounded-full shadow-lg relative z-10 w-full h-full flex items-center justify-center">
                                    <span className="text-3xl font-bold text-blue-600">100%</span>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Transparency</span>
                        </motion.div>
                    </motion.div>

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

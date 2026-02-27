"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    BookOpen,
    HeartHandshake,
    Scale,
    CloudRain,
    Recycle,
    TreePine,
    Users
} from "lucide-react";

const sdgGoals = [
    {
        id: 4,
        title: "Quality Education",
        icon: <BookOpen size={28} />,
        color: "from-orange-400 to-red-500",
        shadow: "shadow-orange-500/30"
    },
    {
        id: 1,
        title: "No Poverty",
        icon: <HeartHandshake size={28} />,
        color: "from-red-500 to-rose-600",
        shadow: "shadow-red-500/30"
    },
    {
        id: 10,
        title: "Reduced Inequalities",
        icon: <Scale size={28} />,
        color: "from-purple-500 to-fuchsia-600",
        shadow: "shadow-purple-500/30"
    },
    {
        id: 13,
        title: "Climate Action",
        icon: <CloudRain size={28} />,
        color: "from-emerald-500 to-green-600",
        shadow: "shadow-emerald-500/30"
    },
    {
        id: 12,
        title: "Responsible Consumption",
        icon: <Recycle size={28} />,
        color: "from-amber-400 to-yellow-500",
        shadow: "shadow-amber-500/30"
    },
    {
        id: 15,
        title: "Life on Land",
        icon: <TreePine size={28} />,
        color: "from-lime-500 to-green-500",
        shadow: "shadow-lime-500/30"
    },
    {
        id: 5,
        title: "Gender Equality",
        icon: <Users size={28} />,
        color: "from-pink-500 to-rose-500",
        shadow: "shadow-pink-500/30"
    }
];

export default function SustainableGoalsSection() {
    return (
        <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white">

            {/* Soft Multicolor Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-transparent opacity-60 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/20 via-teal-500/20 to-transparent opacity-60 mix-blend-overlay pointer-events-none" />

            {/* Parallax Floating Shapes (Background Decor) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16"
                >
                    <span className="text-blue-300 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                        Towards Achieving
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-sm">
                        SUSTAINABLE <span className="text-yellow-400">DEVELOPMENT GOALS</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-green-400 rounded-full mx-auto mt-6" />
                </motion.div>

                {/* SDG Cards Container (Diamond Layout) */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-8">
                    {sdgGoals.map((goal, index) => (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            whileHover={{ scale: 1.08, y: -10 }}
                            animate={{ y: [0, -5, 0] }} // Continuous float
                            // @ts-ignore - separate transition for hover vs continuous animate is tricky in simple props, using hover mainly
                            className="group relative flex flex-col items-center"
                        >
                            {/* Diamond Shape */}
                            <div className={`relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center transform rotate-45 rounded-3xl bg-gradient-to-br ${goal.color} shadow-lg ${goal.shadow} group-hover:shadow-2xl group-hover:shadow-white/20 transition-all duration-300 border-4 border-white/10 backdrop-blur-md`}>
                                {/* Inner Icon (Un-rotated) */}
                                <div className="transform -rotate-45 flex flex-col items-center justify-center text-white">
                                    <span className="text-3xl font-black mb-1 drop-shadow-md">{goal.id}</span>
                                    <div className="opacity-90 group-hover:sbnncale-110 transition-transform duration-300">
                                        {goal.icon}
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            {/* Label Below */}
                            <div className="mt-8 md:mt-10 max-w-[120px]">
                                <h3 className="text-sm font-bold text-blue-100 group-hover:text-white transition-colors duration-300 uppercase tracking-wide leading-tight">
                                    {goal.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, Globe, Users } from "lucide-react";

const drives = [
    {
        title: "Education",
        description: "Igniting minds through quality learning and resources for the underprivileged.",
        icon: BookOpen,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Healthcare",
        description: "Ensuring accessible medical support and promoting healthy living standards.",
        icon: Heart,
        color: "text-red-600",
        bg: "bg-red-50"
    },
    {
        title: "Sustainability",
        description: "Fostering environmental awareness and green initiatives for a better tomorrow.",
        icon: Globe,
        color: "text-green-600",
        bg: "bg-green-50"
    },
    {
        title: "Community",
        description: "Building strong support networks and empowering local community growth.",
        icon: Users,
        color: "text-purple-600",
        bg: "bg-purple-50"
    }
];

export default function WhatDrivesUs() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                        What Drives Us
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {drives.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                        >
                            <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

const wings = [
    {
        title: "EDUCARE",
        description: "Empowering children through quality education and scholarships.",
        color: "bg-blue-100 text-blue-600",
        icon: "🎓",
    },
    {
        title: "NIRMITEE",
        description: "Skill development and women empowerment initiatives.",
        color: "bg-pink-100 text-pink-600",
        icon: "👩‍🏫",
    },
    {
        title: "GREEN HAT",
        description: "Environmental conservation and tree plantation drives.",
        color: "bg-green-100 text-green-600",
        icon: "🌱",
    },
    {
        title: "PRERANA",
        description: "Social awareness and community welfare programs.",
        color: "bg-purple-100 text-purple-600",
        icon: "🤝",
    },
];

export default function OurWings() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-gray-900"
                >
                    Our Iconic Initiatives
                </motion.h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
                    We focus on four core pillars to drive holistic development in society.
                </p>

                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wings.map((wing, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div
                                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-6 ${wing.color}`}
                            >
                                {wing.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {wing.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {wing.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

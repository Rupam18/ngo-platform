"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const events = [
    {
        title: "Mega Health Camp",
        date: "March 15, 2026",
        location: "Pune, Maharashtra",
        image: "https://placehold.co/600x400/png?text=Health+Camp",
    },
    {
        title: "Tree Plantation Drive",
        date: "April 02, 2026",
        location: "Mumbai, Maharashtra",
        image: "https://placehold.co/600x400/png?text=Tree+Plantation",
    },
    {
        title: "School Kit Distribution",
        date: "June 10, 2026",
        location: "Nashik, Maharashtra",
        image: "https://placehold.co/600x400/png?text=School+Kit",
    },
];

export default function Events() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-blue-600 font-semibold tracking-wide uppercase">
                            Get Involved
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
                            Current Events
                        </h2>
                    </div>
                    <Button variant="outline" className="hidden md:flex">View All Events</Button>
                </div>


                <div className="grid md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                                    {event.date}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {event.title}
                            </h3>
                            <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm">
                                <span>📍</span> {event.location}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Button variant="outline">View All Events</Button>
                </div>
            </div>
        </section>
    );
}

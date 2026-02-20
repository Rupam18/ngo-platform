"use client";

import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const staticNews = [
    {
        id: "1",
        title: "Annual CSR Connect 2026 Concludes with Major Pledges",
        date: "February 18, 2026",
        excerpt: "Corporate leaders and NGO workers gathered to discuss sustainable community upliftment, resulting in over 10 new corporate alliances.",
        image: "/community-development.jpg",
        category: "Press Release"
    },
    {
        id: "2",
        title: "Project Educare Reaches 500+ Children",
        date: "January 22, 2026",
        excerpt: "Thanks to generous donations, we have successfully provided non-stop learning resources to migrant children.",
        image: "/educare.jpg",
        category: "Milestone"
    },
    {
        id: "3",
        title: "Green Hat Volunteer Drive Hits Record Turnout",
        date: "December 10, 2025",
        excerpt: "Over 200 youths participated in our weekend plantation drive, planting 5,000 saplings near the city outskirts.",
        image: "/environmentalcare.jpg",
        category: "Events"
    },
    {
        id: "4",
        title: "New Community Library Built Supported By Locals",
        date: "November 05, 2025",
        excerpt: "A brand new learning facility was inaugurated today equipped with thousands of donated books and computer access.",
        image: "/library.jpg",
        category: "Update"
    }
];

export default function MediaNewsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* Header */}
            <section className="pt-16 pb-12 text-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-sm mb-4">
                        Latest <span className="text-red-600">News</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay informed about our latest milestones, announcements, and events.
                    </p>
                </motion.div>
            </section>

            {/* News Grid */}
            <section className="flex-grow max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staticNews.map((news, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        key={news.id}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                    >
                        {/* Image Container */}
                        <div className="relative w-full h-56 overflow-hidden">
                            <Image
                                src={news.image}
                                alt={news.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm uppercase tracking-wider">
                                {news.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                                <Calendar size={16} className="text-red-500" /> {news.date}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                                {news.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">
                                {news.excerpt}
                            </p>

                            <Link href="#" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-red-600 transition-colors mt-auto">
                                Read More <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </section>

            <Footer />
        </main>
    );
}

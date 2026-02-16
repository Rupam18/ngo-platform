"use client";

import { motion } from "framer-motion";

const partners = [
    "Partner 1", "Partner 2", "Partner 3", "Partner 4", "Partner 5", "Partner 6"
];

export default function Partners() {
    return (
        <section className="py-16 bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    Trusted by Our CSR Partners
                </h3>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Replace with actual logos */}
                    {partners.map((partner, i) => (
                        <div key={i} className="bg-gray-200 h-12 w-32 rounded flex items-center justify-center font-bold text-gray-400">
                            {partner}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

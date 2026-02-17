"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
    { name: "Partner 1", logo: "https://placehold.co/200x80/png?text=Partner+1" },
    { name: "Partner 2", logo: "https://placehold.co/200x80/png?text=Partner+2" },
    { name: "Partner 3", logo: "https://placehold.co/200x80/png?text=Partner+3" },
    { name: "Partner 4", logo: "https://placehold.co/200x80/png?text=Partner+4" },
    { name: "Partner 5", logo: "https://placehold.co/200x80/png?text=Partner+5" },
    { name: "Partner 6", logo: "https://placehold.co/200x80/png?text=Partner+6" },
];

export default function CSRPartners() {
    return (
        <section className="py-12 md:py-20 bg-gray-50 overflow-hidden border-t">
            <div className="max-w-7xl mx-auto px-6 text-center mb-8 md:mb-12">
                <span className="text-blue-600 font-semibold tracking-wide uppercase">
                    Our Supporters
                </span>
                <h2 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900">
                    CSR Partners
                </h2>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradients for fading edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                <div className="flex w-max animate-scroll hover:[animation-play-state:paused] gap-12">
                    {/* Double the list for seamless loop */}
                    {[...partners, ...partners].map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
                        >
                            <div className="relative w-40 h-20">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
        </section>
    );
}

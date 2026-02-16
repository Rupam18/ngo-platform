"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

                {/* Column 1: About / Address */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                        Riso Head Office
                    </h3>
                    <p className="leading-relaxed mb-4">
                        Rostrum India Social Organization<br />
                        123, Social Avenue, <br />
                        Pune, Maharashtra, India - 411001
                    </p>
                    <p className="text-sm text-gray-500">
                        Reg. No: 1234/5678/90
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                        Quick Links
                    </h3>
                    <ul className="space-y-3">
                        {['Home', 'About Us', 'Our Work', 'Media', 'Join Us', 'Events', 'Donate'].map((item) => (
                            <li key={item}>
                                <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                        Contact Us
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">📞</span>
                            <div>
                                <h4 className="text-white font-semibold">Phone</h4>
                                <p>+91 98765 43210</p>
                                <p>+91 12345 67890</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="text-2xl">✉️</span>
                            <div>
                                <h4 className="text-white font-semibold">Email</h4>
                                <p>contact@rostrumindia.org</p>
                                <p>support@rostrumindia.org</p>
                            </div>
                        </div>

                        <motion.div
                            className="mt-6 flex gap-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {/* Social Icons Placeholder */}
                            {['Fb', 'Tw', 'In', 'Yt'].map((social) => (
                                <div key={social} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">
                                    {social}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Rostrum India Social Organization. All rights reserved.
            </div>
        </footer>
    );
}

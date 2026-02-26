"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0B1D3A] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

                {/* Column 1: RISO Head Office */}
                <div>
                    <h3 className="text-xl font-semibold mb-6 tracking-wide uppercase flex items-center gap-2">
                        <MapPin className="text-yellow-400 w-5 h-5 -mt-1" />
                        Riso Head Office
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Rostrum India Social Organization (RISO)<br />
                        Office No 1, 1st Floor, Chandrashila Complex,<br />
                        Opp Ashirwad Mangal Karyalaya, NDA Road,<br />
                        Shivane, Pune 411023 (Maharashtra, IND)
                    </p>
                    <p className="text-sm text-gray-400">
                        Reg. No: 1234/5678/90
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-6 tracking-wide uppercase">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'About Us', path: '/about' },
                            { name: 'Programs', path: '/programs' },
                            { name: 'Media', path: '/media' },
                            { name: 'Donate', path: '/donate' }
                        ].map((item) => (
                            <li key={item.name}>
                                <Link href={item.path} className="hover:text-yellow-400 transition-colors">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Contact Us */}
                <div>
                    <h3 className="text-xl font-semibold mb-6 tracking-wide uppercase">
                        Contact Us
                    </h3>

                    <div className="space-y-4 text-gray-300">
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-1 text-yellow-400" />
                            <div>
                                <p>+91 9730035255</p>
                                <p>+91 9860133100</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 mt-1 text-yellow-400" />
                            <div>
                                <p>info@rostrumindia.org</p>
                                <p>rostrumindia@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Icons with Glass Effect */}
                    <div className="flex gap-4 mt-8">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/rostrumindiasocial/"
                            className="group w-12 h-12 flex items-center justify-center rounded-xl 
                            bg-white/10 backdrop-blur-md border border-white/20 
                            shadow-lg transition-all duration-300 
                            hover:bg-[#1877F2] hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Facebook className="w-5 h-5 text-white group-hover:text-white" />
                        </a>

                        {/* Twitter */}
                        <a
                            href="https://x.com/rostrumindia?lang=en"
                            className="group w-12 h-12 flex items-center justify-center rounded-xl 
                            bg-white/10 backdrop-blur-md border border-white/20 
                            shadow-lg transition-all duration-300 
                            hover:bg-[#000000] hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Twitter className="w-5 h-5 text-white group-hover:text-white" />
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://api.whatsapp.com/send/?phone=919860133100&text=Thank+you+for+Connecting+with+Rostrum+India&type=phone_number&app_absent=0"
                            className="group w-12 h-12 flex items-center justify-center rounded-xl 
                            bg-white/10 backdrop-blur-md border border-white/20 
                            shadow-lg transition-all duration-300 
                            hover:bg-[#25D366] hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <MessageCircle className="w-5 h-5 text-white group-hover:text-white" />
                        </a>

                        {/* YouTube */}
                        <a
                            href="#"
                            className="group w-12 h-12 flex items-center justify-center rounded-xl 
                            bg-white/10 backdrop-blur-md border border-white/20 
                            shadow-lg transition-all duration-300 
                            hover:bg-[#FF0000] hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Youtube className="w-5 h-5 text-white group-hover:text-white" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Rostrum India Social Organization. All rights reserved.
            </div>
        </footer>
    );
}

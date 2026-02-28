"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Mail, Phone, MessageCircle, MapPin, ChevronRight } from "lucide-react";

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
                                <Link
                                    href={item.path}
                                    className="group flex items-center gap-2 hover:text-yellow-400 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
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
                            className="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-[#1877F2] hover:border-transparent hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Facebook className="w-[22px] h-[22px] text-white transition-transform duration-300 group-hover:scale-110" />
                        </a>

                        {/* Twitter (X) */}
                        <a
                            href="https://x.com/rostrumindia?lang=en"
                            className="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-black hover:border-transparent hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-white transition-transform duration-300 group-hover:scale-110">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                            </svg>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://api.whatsapp.com/send/?phone=919860133100&text=Thank+you+for+Connecting+with+Rostrum+India&type=phone_number&app_absent=0"
                            className="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-[#25D366] hover:border-transparent hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white transition-transform duration-300 group-hover:scale-110">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@rostrumindiasocialorganiza5331"
                            className="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-[#FF0000] hover:border-transparent hover:scale-110"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Youtube className="w-[22px] h-[22px] text-white transition-transform duration-300 group-hover:scale-110" />
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

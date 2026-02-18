"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

export default function StickyHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Programs", href: "/programs" },
        { name: "Impact", href: "/impact" },
        { name: "CSR Partners", href: "/partners" },
        { name: "Media", href: "/media" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.header
            className={`sticky top-0 z-[999] w-full bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300 ${isScrolled ? "shadow-md" : ""
                }`}
        >
            {/* =======================
               TOP ROW: Logo + Actions
               ======================= */}
            <div className={`max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-2" : "py-3"
                }`}>
                {/* LOGO */}
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center w-[520px]">
                        <img
                            src="/banner-removebg-preview.png"
                            alt="RISO Logo"
                            className="w-full h-16 object-contain transition-all duration-500 hover:scale-105 animate-[float_4s_ease-in-out_infinite]"
                        />
                    </div>
                </Link>

                {/* RIGHT SIDE (Desktop) */}
                <div className="hidden xl:flex items-center gap-6">
                    {/* SOCIAL ICONS */}
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ultra-icon fb"><Facebook size={18} /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ultra-icon linkedin"><Linkedin size={18} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ultra-icon insta"><Instagram size={18} /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="ultra-icon yt"><Youtube size={18} /></a>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center gap-3">
                        <Link href="/donate">
                            <button className="bg-yellow-400 px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-yellow-300/40 hover:scale-105 transition hover:bg-yellow-500 text-gray-900">
                                DONATE
                            </button>
                        </Link>
                        <Link href="/donate-in-kind">
                            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow transition hover:scale-105">
                                DONATE IN KIND
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* =======================
               BOTTOM ROW: Menu + Contact
               ======================= */}
            <div className="hidden xl:block border-t border-gray-100">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-3 flex justify-between items-center">

                    {/* NAV LINKS */}
                    <nav className="flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-[15px] font-medium text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-700 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CONTACT */}
                    <div className="flex gap-6 text-sm text-gray-600 font-medium">
                        <a href="tel:+919730035255" className="flex items-center gap-2 hover:text-blue-700 transition-colors">
                            <Phone size={16} className="text-blue-600" /> +91 9730035255
                        </a>
                        <a href="mailto:info@rostrumindia.org" className="flex items-center gap-2 hover:text-blue-700 transition-colors">
                            <Mail size={16} className="text-blue-600" /> info@rostrumindia.org
                        </a>
                    </div>
                </div>
            </div>

            {/* =======================
               MOBILE DRAWER
               ======================= */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col xl:hidden"
                        >
                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-xl font-bold text-gray-800">Menu</span>
                                    <button onClick={() => setIsMobileMenuOpen(false)}>
                                        <X size={24} className="text-gray-500" />
                                    </button>
                                </div>

                                {/* Nav Links */}
                                <div className="space-y-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="block px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile Contact */}
                                <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone size={18} className="text-blue-600" />
                                        <span>+91 9730035255</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail size={18} className="text-blue-600" />
                                        <span>info@rostrumindia.org</span>
                                    </div>
                                </div>

                                {/* Mobile Buttons */}
                                <div className="mt-6 space-y-3">
                                    <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold h-12 rounded-lg shadow-md hover:shadow-yellow-300/40 transition">
                                            DONATE
                                        </button>
                                    </Link>
                                    <Link href="/donate-in-kind" onClick={() => setIsMobileMenuOpen(false)}>
                                        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold h-12 rounded-lg shadow-md transition">
                                            DONATE IN KIND
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

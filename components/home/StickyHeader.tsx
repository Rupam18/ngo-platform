"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function StickyHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();

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
        { name: "Media", href: "/media" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
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
                        <div className="flex items-center">
                            <img
                                src="/banner-removebg-preview.png"
                                alt="RISO Logo"
                                className="h-16 w-auto object-contain object-left transition-all duration-300 ease-in-out hover:scale-105 hover:drop-shadow-sm origin-left will-change-transform"
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
                            <Link href="/inkind-donation">
                                <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition inline-block text-center cursor-pointer">
                                    DONATE IN KIND
                                </span>
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
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative text-[15px] font-medium transition-colors uppercase tracking-wide group ${isActive ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="header-underline"
                                                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-700"
                                            />
                                        )}
                                        <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-blue-700 transition-transform duration-300 origin-left ${isActive ? 'scale-x-0' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                    </Link>
                                );
                            })}
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
            </motion.header>

            {/* =======================
            MOBILE DRAWER (Imported Component)
            ======================= */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                setIsOpen={setIsMobileMenuOpen}
                navLinks={navLinks}
            />
        </>
    );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Facebook, Twitter, MessageCircle, Youtube } from "lucide-react";
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
                <div className={`w-full px-4 md:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-2" : "py-3"
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
                        <div className="flex gap-3 items-center">
                            {/* Facebook */}
                            <a href="https://www.facebook.com/rostrumindiasocial/" target="_blank" rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-gray-800 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1F3C88]/40 hover:text-[#1F3C88]">
                                <Facebook size={18} />
                            </a>

                            {/* Twitter (X) */}
                            <a href="https://x.com/rostrumindia?lang=en" target="_blank" rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-gray-800 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-black/40 hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                                </svg>
                            </a>

                            {/* WhatsApp */}
                            <a href="https://api.whatsapp.com/send/?phone=919860133100&text=Thank+you+for+Connecting+with+Rostrum+India&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-gray-800 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/40 hover:text-[#25D366] hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-gray-800 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#A12C2C]/40 hover:text-[#A12C2C]">
                                <Youtube size={18} />
                            </a>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex items-center gap-3">
                            <Link href="/donate">
                                <button className="bg-yellow-400 px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-yellow-300/40 hover:scale-105 transition hover:bg-yellow-500 text-gray-900">
                                    DONATE NOW
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
                    <div className="w-full px-4 lg:px-8 py-3 flex justify-between items-center">

                        {/* NAV LINKS */}
                        <nav className="flex gap-5">
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

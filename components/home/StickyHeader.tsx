"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";

export default function StickyHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setIsScrolled(latest > 20);
    });

    // Close mobile menu when screen size increases to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Also ensure header is visible if menu was open
            setIsHidden(false);
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Programs", href: "/programs" },
        { name: "Impact", href: "/impact" },
        { name: "CSR Partners", href: "/partners" },
        { name: "Media", href: "/media" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: isHidden ? "-100%" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2 md:py-3" : "bg-white py-4 md:py-6"}`}
        >
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">

                <div className="flex items-center gap-3 z-50">
                    <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative w-48 h-20 md:w-80 md:h-24 shrink-0"
                        >
                            <Image
                                src="/banner.png"
                                alt="RISO Logo"
                                fill
                                className="object-contain drop-shadow-xl saturate-150"
                                priority
                            />
                        </motion.div>
                    </Link>
                </div>

                {/* CENTER: Nav Links (Desktop) */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-700 font-medium hover:text-blue-600 transition-colors relative group text-sm uppercase tracking-wide py-1"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* RIGHT: Buttons & Mobile Toggle */}
                <div className="flex items-center gap-3 md:gap-4 shrink-0 z-50">
                    {/* Contact Info (Desktop XL only) */}
                    <div className="hidden xl:flex flex-col items-end text-xs text-gray-600 mr-2">
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Phone size={12} /> <span>+91 9730035255</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Mail size={12} /> <span>info@rostrumindia.org</span>
                        </div>
                    </div>

                    {/* Donate Button - Visible on Mobile & Desktop */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/donate">
                            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm shadow-sm">
                                DONATE
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Volunteer Button - Desktop Only */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden lg:block">
                        <Link href="/volunteer">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 shadow-sm text-sm">
                                VOLUNTEER
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-700 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer (Slide from Right) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl flex flex-col h-full lg:hidden"
                        >
                            {/* Drawer Header */}
                            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <span className="font-bold text-lg text-gray-800">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Links */}
                            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="flex items-center justify-between text-lg font-medium text-gray-700 py-3 border-b border-gray-50 hover:text-blue-600 transition-colors group"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                                    </Link>
                                ))}
                            </div>

                            {/* Drawer Footer (Volunteer + Contact) */}
                            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                                <Link href="/volunteer" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-base rounded-xl shadow-md">
                                        BECOME A VOLUNTEER
                                    </Button>
                                </Link>

                                <div className="space-y-3 pt-2">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Us</h4>
                                    <a href="tel:+919730035255" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors bg-white p-3 rounded-lg shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Phone size={16} />
                                        </div>
                                        <span className="text-sm font-medium">+91 9730035255</span>
                                    </a>
                                    <a href="mailto:info@rostrumindia.org" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors bg-white p-3 rounded-lg shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Mail size={16} />
                                        </div>
                                        <span className="text-sm font-medium">info@rostrumindia.org</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

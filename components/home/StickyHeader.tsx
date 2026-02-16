"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function StickyHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${isScrolled ? "shadow-md py-2" : "py-4"
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-4 lg:px-6 flex items-center justify-between">

                {/* LEFT: Logo & Identity */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 transition-transform group-hover:scale-105">
                            {/* Using banner.png as placeholderlogo */}
                            <Image src="/banner.png" alt="RISO Logo" fill className="object-contain" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-none">
                                Rostrum India Social Organization
                            </h1>
                            <p className="text-sm text-blue-600 font-medium italic mt-0.5">
                                Be Social... Be Special..!
                            </p>
                        </div>
                    </Link>
                </div>

                {/* CENTER: Nav Links (Desktop) */}
                <nav className="hidden xl:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-700 font-medium hover:text-blue-600 transition-colors relative group text-sm uppercase tracking-wide"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* RIGHT: Contact & Buttons (Desktop) */}
                <div className="hidden lg:flex items-center gap-4 shrink-0">
                    <div className="hidden 2xl:flex flex-col items-end text-xs text-gray-600 mr-2">
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Phone size={12} /> <span>+91 9730035255</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Mail size={12} /> <span>info@rostrumindia.org</span>
                        </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full px-6 shadow-sm">
                            DONATE
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 shadow-sm">
                            VOLUNTEER
                        </Button>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="xl:hidden p-2 text-gray-700"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="p-6 space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="pt-4 space-y-3">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone size={16} /> <span>+91 9730035255</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail size={16} /> <span>info@rostrumindia.org</span>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col gap-3">
                                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                                    DONATE
                                </Button>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                                    VOLUNTEER
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

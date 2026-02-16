"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Work", href: "/work" },
    { name: "Media", href: "/media" },
    { name: "Join Us", href: "/join" },
    { name: "Events", href: "/events" },
    { name: "Donate Us", href: "/donate" },
    { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-40 w-full bg-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo / Brand (Visible only on mobile usually, or if TopHeader scrolls away) 
              But request didn't specify logo here, just menu items. 
              I'll assume just menu items for desktop to keep it clean if TopHeader is present.
          */}
                    <div className="md:hidden text-white font-bold text-xl">
                        RISO
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex w-full justify-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative text-white font-medium text-sm lg:text-base py-2 transition-colors hover:text-blue-100`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute left-0 right-0 -bottom-1 h-0.5 bg-white"
                                        />
                                    )}
                                    <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 transition-transform duration-300 hover:scale-x-100 origin-left" />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="block h-0.5 w-full bg-current origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block h-0.5 w-full bg-current"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                className="block h-0.5 w-full bg-current origin-center"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-blue-700"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-white text-lg font-medium py-2 border-b border-blue-600 hover:text-blue-200 transition-colors ${pathname === item.href ? "text-blue-200" : ""
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

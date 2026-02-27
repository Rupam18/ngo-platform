"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

// Extend the link type to support sub-menus
export interface NavLink {
    name: string;
    href: string;
    subLinks?: { name: string; href: string }[];
}

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    navLinks: NavLink[];
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks }: Props) {
    const pathname = usePathname();
    // State to track which submenus are expanded
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    // Prevent background scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleExpand = (name: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    const drawerVariants: any = {
        hidden: { x: "-100%", opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300,
            }
        },
        exit: {
            x: "-100%",
            opacity: 0,
            transition: { ease: "easeInOut", duration: 0.3 }
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Semi-transparent dark overlay */}
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[1000] bg-black/50 xl:hidden"
                    />

                    {/* Slide-in Drawer (Left) */}
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-y-0 left-0 z-[1001] flex flex-col xl:hidden w-[85%] max-w-sm bg-white shadow-2xl overflow-hidden"
                    >
                        {/* Header / Logo Area */}
                        <div className="flex items-center p-6 border-b border-gray-100 bg-white">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 -ml-2 mr-4 text-gray-500 transition-colors bg-white rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                            <span className="text-xl font-bold tracking-tight text-gray-900">
                                Menu
                            </span>
                        </div>

                        {/* Scrollable Middle Content (Links) */}
                        <div className="flex-1 overflow-y-auto w-full">
                            <div className="flex flex-col w-full">
                                {navLinks.map((link) => {
                                    const hasSubLinks = !!link.subLinks && link.subLinks.length > 0;
                                    const isExpanded = !!expandedItems[link.name];
                                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                                    return (
                                        <div key={link.name} className="flex flex-col border-b border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    href={hasSubLinks ? "#" : link.href}
                                                    onClick={(e) => {
                                                        if (hasSubLinks) {
                                                            e.preventDefault();
                                                            toggleExpand(link.name);
                                                        } else {
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                    className={`flex-1 py-4 px-6 text-lg font-medium transition-colors hover:bg-gray-50 ${isActive ? "text-blue-700 font-semibold" : "text-gray-800"
                                                        }`}
                                                >
                                                    {link.name}
                                                </Link>

                                                {/* Expand/Collapse Button for Sublinks */}
                                                {hasSubLinks && (
                                                    <button
                                                        onClick={() => toggleExpand(link.name)}
                                                        className="p-4 text-gray-500 flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Expandable Submenu */}
                                            <AnimatePresence>
                                                {hasSubLinks && isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-gray-50 flex flex-col"
                                                    >
                                                        {link.subLinks!.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                href={sub.href}
                                                                onClick={() => setIsOpen(false)}
                                                                className="block py-3 pl-10 pr-6 text-base font-medium text-gray-600 border-t border-gray-100/50 hover:bg-gray-100 hover:text-blue-700 transition-colors"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sticky Bottom Footer (Donate & In-Kind) */}
                        <div className="px-8 py-5 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] w-full flex flex-col gap-2.5">
                            <Link href="/donate" onClick={() => setIsOpen(false)} className="w-full">
                                <Button variant="primary" className="w-full">
                                    Donate Now
                                </Button>
                            </Link>

                            <Link href="/inkind-donation" onClick={() => setIsOpen(false)} className="w-full">
                                <Button variant="secondary" className="w-full">
                                    Donate in Kind
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

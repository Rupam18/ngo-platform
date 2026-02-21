"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Heart,
    Flag,
    Users,
    FileText,
    UserPlus,
    Settings,
    Layers,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Donations", href: "/dashboard/donations", icon: Heart },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "Donors", href: "/dashboard/donors", icon: Users },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserPlus },
    { name: "Content", href: "/dashboard/content", icon: Layers },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            initial={{ width: 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            className="flex flex-col h-screen bg-[#0f172a] text-slate-300 border-r border-slate-800 relative transition-all duration-300 z-20 flex-shrink-0"
        >
            <div className="p-6 flex items-center justify-between h-20">
                {!isCollapsed && (
                    <span className="text-xl font-bold text-white tracking-wider flex items-center gap-2 truncate">
                        <Heart className="text-emerald-500 shrink-0" fill="currentColor" />
                        NGO Admin
                    </span>
                )}
                {isCollapsed && (
                    <Heart className="text-emerald-500 mx-auto shrink-0" fill="currentColor" />
                )}
            </div>

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-slate-800 border border-slate-700 rounded-full p-1 hover:bg-slate-700 text-white z-50 transition-colors"
                aria-label="Toggle Sidebar"
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {SIDEBAR_ITEMS.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    // Ensure Dashboard home is only active if exact match
                    const isExactActive = item.href === "/dashboard" ? pathname === "/dashboard" : isActive;

                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isExactActive
                                        ? "bg-emerald-600/10 text-emerald-400 font-medium"
                                        : "hover:bg-slate-800/50 hover:text-white"
                                    }`}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <item.icon size={20} className={isExactActive ? "text-emerald-400 shrink-0" : "shrink-0"} />
                                {!isCollapsed && <span className="truncate">{item.name}</span>}
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 h-16 flex flex-col justify-center">
                {!isCollapsed ? (
                    <div className="text-xs text-slate-500 text-center truncate">
                        © 2026 NGO Platform
                    </div>
                ) : (
                    <div className="text-xs text-slate-500 text-center truncate">NGO</div>
                )}
            </div>
        </motion.aside>
    );
}

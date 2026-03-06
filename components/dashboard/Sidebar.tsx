"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Heart,
    PiggyBank,
    UserCheck,
    CreditCard,
    RefreshCw,
    HandHeart,
    FileText,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Settings,
    MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: PiggyBank },
    { name: "Donors", href: "/dashboard/donors", icon: UserCheck },
    { name: "Donations", href: "/dashboard/donations", icon: CreditCard },
    { name: "Recurring", href: "/dashboard/recurring", icon: RefreshCw },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Impact", href: "/dashboard/impact", icon: HandHeart },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Compliance", href: "/dashboard/compliance", icon: CheckCircle },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            initial={{ width: 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            className="flex flex-col h-screen bg-white text-slate-700 border-r border-slate-200 relative transition-all duration-300 z-20 flex-shrink-0"
        >
            <div className="p-6 flex items-center justify-between h-20">
                {!isCollapsed && (
                    <div className="flex items-center gap-2 relative h-16 w-48 -ml-2">
                        <img
                            src="/RISO_LOGO_Final2.png"
                            alt="RISO Logo"
                            className="object-contain w-full h-full drop-shadow-sm scale-110"
                        />
                    </div>
                )}
                {isCollapsed && (
                    <div className="relative h-12 w-12 mx-auto">
                        <img
                            src="/RISO_LOGO_Final2.png"
                            alt="R"
                            className="object-contain w-full h-full drop-shadow-sm scale-110"
                        />
                    </div>
                )}
            </div>

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-white border border-slate-200 rounded-full p-1 hover:bg-slate-50 text-slate-600 shadow-sm z-50 transition-colors"
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
                                    ? "bg-red-50 text-red-600 font-medium border border-red-100 shadow-sm"
                                    : "hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <item.icon size={20} className={isExactActive ? "text-red-600 shrink-0" : "text-slate-400 shrink-0"} />
                                {!isCollapsed && <span className="truncate">{item.name}</span>}
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 h-16 flex flex-col justify-center">
                {!isCollapsed ? (
                    <div className="text-xs text-slate-500 text-center truncate font-medium">
                        © 2026 RISO Platform
                    </div>
                ) : (
                    <div className="text-xs text-slate-500 text-center truncate font-bold tracking-wider">RISO</div>
                )}
            </div>
        </motion.aside>
    );
}

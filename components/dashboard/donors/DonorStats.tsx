"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, RefreshCw, HandCoins, TrendingUp } from "lucide-react";

export function DonorStats() {
    const stats = [
        { label: "Total Donors", value: "24,592", icon: Users, trend: "+12.5%", color: "text-blue-500", bg: "bg-blue-50", gradient: "from-blue-50/50 to-transparent" },
        { label: "Active Donors", value: "18,245", icon: UserCheck, trend: "+5.2%", color: "text-emerald-500", bg: "bg-emerald-50", gradient: "from-emerald-50/50 to-transparent" },
        { label: "Recurring Donors", value: "4,120", icon: RefreshCw, trend: "+18.4%", color: "text-purple-500", bg: "bg-purple-50", gradient: "from-purple-50/50 to-transparent" },
        { label: "Total Value", value: "₹12.5M", icon: HandCoins, trend: "+8.9%", color: "text-amber-500", bg: "bg-amber-50", gradient: "from-amber-50/50 to-transparent" },
        { label: "Avg. Donation", value: "₹4,250", icon: TrendingUp, trend: "+2.1%", color: "text-indigo-500", bg: "bg-indigo-50", gradient: "from-indigo-50/50 to-transparent" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, idx) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer"
                >
                    {/* Hover Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:shadow-md transition-all duration-300`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                                <span>↑</span>
                                <span>{stat.trend.replace('+', '')}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</h3>
                            <div className="text-2xl font-bold text-gray-900 tracking-tight">
                                {stat.value}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

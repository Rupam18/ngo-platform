"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CampaignCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    subtitle?: string;
    trend?: number;
    delay?: number;
    prefix?: string;
    suffix?: string;
}

export function CampaignCard({ title, value, icon: Icon, subtitle, trend, delay = 0, prefix = "", suffix = "" }: CampaignCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer"
        >
            {/* Background gradient effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-emerald-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gray-50 text-gray-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md transition-all duration-300">
                        <Icon size={24} />
                    </div>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}>
                            <span>{trend >= 0 ? '↑' : '↓'}</span>
                            <span>{Math.abs(trend)}%</span>
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
                    <div className="text-3xl font-bold text-gray-900 tracking-tight flex items-baseline gap-1">
                        {prefix && <span className="text-xl text-gray-400 font-medium">{prefix}</span>}
                        {value}
                        {suffix && <span className="text-xl text-gray-400 font-medium">{suffix}</span>}
                    </div>
                    {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
                </div>
            </div>
        </motion.div>
    );
}

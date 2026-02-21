"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, HandCoins, Activity, CalendarClock, Trophy } from "lucide-react";

interface CampaignStatsProps {
    totalDonations: number;
    uniqueDonors: number;
    averageDonation: number;
    largestDonation: number;
    conversionRate: number;
    durationDays: number;
}

export function CampaignStats({ stats }: { stats: CampaignStatsProps }) {
    const items = [
        { label: "Total Donations", value: stats.totalDonations, icon: HandCoins, prefix: "₹" },
        { label: "Unique Donors", value: stats.uniqueDonors, icon: Users },
        { label: "Avg. Donation", value: stats.averageDonation, icon: TrendingUp, prefix: "₹" },
        { label: "Largest Donation", value: stats.largestDonation, icon: Trophy, prefix: "₹" },
        { label: "Conversion Rate", value: stats.conversionRate, icon: Activity, suffix: "%" },
        { label: "Duration", value: stats.durationDays, icon: CalendarClock, suffix: " Days" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, idx) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-100 transition-colors"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                            <item.icon size={18} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</h4>
                        <p className="text-xl font-bold text-gray-900 tracking-tight">
                            {item.prefix}{item.value.toLocaleString("en-IN")}{item.suffix}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

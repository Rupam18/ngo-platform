"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

export function DonorLeaderboard() {
    const topDonors = [
        { id: 1, name: "Anjali Gupta", amount: 250000, company: "Tech Innovations Inc.", tier: "gold" },
        { id: 2, name: "Rahul Sharma", amount: 125000, company: "Private", tier: "silver" },
        { id: 3, name: "Rajesh Iyer", amount: 60000, company: "Private", tier: "bronze" },
        { id: 4, name: "Priya Patel", amount: 45000, company: "Global Foundation", tier: "standard" },
        { id: 5, name: "Suresh Nair", amount: 35000, company: "Private", tier: "standard" },
    ];

    const getInitials = (name: string) => {
        const parts = name.split(" ");
        if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name[0].toUpperCase();
    };

    const getTrophy = (tier: string) => {
        switch (tier) {
            case "gold": return <Trophy size={20} className="text-amber-500" />;
            case "silver": return <Medal size={20} className="text-gray-400" />;
            case "bronze": return <Award size={20} className="text-amber-700" />;
            default: return <span className="text-gray-300 font-bold text-sm w-5 text-center">#</span>;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl shadow-lg border border-indigo-800 p-6 relative overflow-hidden h-full flex flex-col"
        >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10 flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Trophy size={20} className="text-amber-400" /> Top Contributors
                    </h3>
                    <p className="text-sm text-indigo-200 mt-1">Highest lifetime value</p>
                </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col gap-3">
                {topDonors.map((donor, index) => (
                    <div
                        key={donor.id}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${donor.tier === "gold" ? "bg-amber-500/10 border border-amber-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "bg-white/5 hover:bg-white/10"
                            }`}
                    >
                        <div className="flex items-center justify-center w-6">
                            {getTrophy(donor.tier)}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center text-white font-bold border border-indigo-700 shadow-sm">
                            {getInitials(donor.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate">{donor.name}</p>
                            <p className="text-xs text-indigo-300 truncate">{donor.company}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-emerald-400">₹{(donor.amount / 1000)}k</p>
                            {index === 0 && <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">MVP</p>}
                        </div>
                    </div>
                ))}
            </div>

            <button className="relative z-10 w-full mt-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/5">
                View All Leaderboards
            </button>
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";
import { HandCoins, Edit3, Target, Receipt, CheckCircle2 } from "lucide-react";

export function CampaignTimeline() {
    const timeline = [
        { id: 1, type: "donation", text: "Received ₹25,000 donation from Anonymous", time: "2 hours ago", icon: HandCoins, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
        { id: 2, type: "goal", text: "Campaign hit 50% of the total goal", time: "1 day ago", icon: Target, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
        { id: 3, type: "expense", text: "Added expense: School Supplies (₹45,000)", time: "3 days ago", icon: Receipt, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
        { id: 4, type: "edit", text: "Updated campaign description & images", time: "1 week ago", icon: Edit3, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-100" },
        { id: 5, type: "create", text: "Campaign Created & Published", time: "2 weeks ago", icon: CheckCircle2, color: "text-gray-500", bg: "bg-gray-100", border: "border-gray-200" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col"
        >
            <h3 className="text-lg font-bold text-gray-900 mb-6">Activity Timeline</h3>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-6">
                {timeline.map((event, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        key={event.id}
                        className="flex gap-4 group"
                    >
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full ${event.bg} flex items-center justify-center border ${event.border} group-hover:scale-110 transition-transform`}>
                                <event.icon size={18} className={event.color} />
                            </div>
                            {index !== timeline.length - 1 && (
                                <div className="w-[2px] h-full bg-gray-100 mt-2 group-hover:bg-gray-200 transition-colors" />
                            )}
                        </div>
                        <div className="flex-1 pb-4">
                            <h4 className="text-sm font-medium text-gray-900">{event.text}</h4>
                            <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-2.5 mt-4 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                Load More Activity
            </button>
        </motion.div>
    );
}

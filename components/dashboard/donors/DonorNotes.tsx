"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Heart, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonorNotes() {
    const timeline = [
        { id: 1, type: "email", text: "Sent Annual Impact Report 2025", time: "10 Jan 2026", icon: Mail, color: "text-blue-500", bg: "bg-blue-50" },
        { id: 2, type: "thankyou", text: "Automated Thank You sent for Education Campaign", time: "21 Feb 2026", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
        { id: 3, type: "note", text: "Called donor to discuss major gifts program. Very receptive.", time: "15 Dec 2025", icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-50" },
        { id: 4, type: "system", text: "Donor converted to Recurring Monthly Subscription", time: "01 Dec 2025", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
    ];

    // Sorting mock timeline reverse chronically implicitly by IDs above, or normally you'd map.

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Engagement & Notes</h3>
                    <p className="text-sm text-gray-500">Track all communication</p>
                </div>
                <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-gray-200 text-gray-600">
                    <Plus size={16} />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-5">
                {timeline.map((item, index) => (
                    <div key={item.id} className="flex gap-4 group">
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-9 h-9 rounded-full ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <item.icon size={16} className={item.color} />
                            </div>
                            {index !== timeline.length - 1 && (
                                <div className="w-[2px] h-full bg-gray-100 mt-2 group-hover:bg-gray-200 transition-colors" />
                            )}
                        </div>
                        <div className="flex-1 pb-4">
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 relative group-hover:bg-white group-hover:shadow-sm transition-all group-hover:border-gray-200">
                                {/* Triangle pointer */}
                                <div className="absolute top-3 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-gray-50 group-hover:border-r-white transition-all" />

                                <p className="text-sm font-medium text-gray-800 leading-snug">{item.text}</p>
                                <p className="text-xs text-gray-400 mt-1.5 font-medium">{item.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Heart, UserPlus } from "lucide-react";

interface Activity {
    id: string;
    type: "donation" | "registration" | "goal_reached";
    title: string;
    description: string;
    time: string;
}

const activities: Activity[] = [
    {
        id: "1",
        type: "donation",
        title: "New Donation",
        description: "Anil K. donated ₹5,000 to Education Fund",
        time: "5 minutes ago"
    },
    {
        id: "2",
        type: "goal_reached",
        title: "Goal Reached!",
        description: "Disaster Relief campaign hit 100% of its goal",
        time: "1 hour ago"
    },
    {
        id: "3",
        type: "registration",
        title: "New Volunteer",
        description: "Priya S. registered as a volunteer",
        time: "3 hours ago"
    },
    {
        id: "4",
        type: "donation",
        title: "New Donation",
        description: "Anonymous donated ₹10,000 to Water Crisis",
        time: "5 hours ago"
    }
];

export function RecentActivity() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full cursor-pointer hover:bg-emerald-100 transition-colors">
                    View All
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-6">
                {activities.map((activity, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        key={activity.id}
                        className="flex gap-4 group"
                    >
                        <div className="relative z-10">
                            {activity.type === "donation" && (
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                    <Heart size={18} className="text-blue-500" />
                                </div>
                            )}
                            {activity.type === "goal_reached" && (
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                </div>
                            )}
                            {activity.type === "registration" && (
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 group-hover:bg-purple-100 transition-colors">
                                    <UserPlus size={18} className="text-purple-500" />
                                </div>
                            )}
                            {/* Connector line */}
                            {index !== activities.length - 1 && (
                                <div className="absolute top-10 bottom-[-24px] left-1/2 -ml-[1px] w-[2px] bg-gray-100 -z-10 group-hover:bg-gray-200 transition-colors" />
                            )}
                        </div>
                        <div className="flex-1 pb-1">
                            <h4 className="text-sm font-semibold text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

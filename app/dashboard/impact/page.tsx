"use client";

import { motion } from "framer-motion";
import { Users, Heart, BookOpen, TreePine, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DonorLeaderboard } from "@/components/dashboard/donors/DonorLeaderboard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const impactData = [
    { month: "Jan", beneficiaries: 4000, meals: 2400 },
    { month: "Feb", beneficiaries: 5000, meals: 3398 },
    { month: "Mar", beneficiaries: 6000, meals: 4800 },
    { month: "Apr", beneficiaries: 8780, meals: 5908 },
    { month: "May", beneficiaries: 9890, meals: 7800 },
    { month: "Jun", beneficiaries: 12390, meals: 8800 },
];

export default function ImpactTrackingPage() {
    const stats = [
        { label: "Total Beneficiaries", value: "1.2M", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Meals Served", value: "850K", icon: Heart, color: "text-rose-600", bg: "bg-rose-100" },
        { label: "Children Educated", value: "45,000", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Trees Planted", value: "120K", icon: TreePine, color: "text-emerald-600", bg: "bg-emerald-100" },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Impact Dashboard</h1>
                    <p className="text-gray-500 mt-1">Track real-world outcomes and generate impact reports for stakeholders.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-200">
                        <Share2 size={16} className="mr-2" /> Share Publicly
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Download size={16} className="mr-2" /> Generate Impact Report
                    </Button>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{stat.value}</h3>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                {/* Main Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">Growth Timeline</h3>
                            <p className="text-sm text-gray-500">Cumulative impact over H1 2026</p>
                        </div>
                        <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={impactData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="beneficiaries" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBen)" />
                                <Area type="monotone" dataKey="meals" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorMeals)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Leaderboard Panel */}
                <div className="lg:col-span-1 h-full">
                    <DonorLeaderboard />
                </div>
            </div>
        </div>
    );
}

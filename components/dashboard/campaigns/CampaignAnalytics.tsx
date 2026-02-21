"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const timeData = [
    { date: "1 Feb", amount: 4000 },
    { date: "5 Feb", amount: 8000 },
    { date: "10 Feb", amount: 15000 },
    { date: "15 Feb", amount: 12000 },
    { date: "20 Feb", amount: 22000 },
    { date: "25 Feb", amount: 18000 },
    { date: "28 Feb", amount: 32000 },
];

const dailyData = [
    { day: "Mon", avg: 4500 },
    { day: "Tue", avg: 3800 },
    { day: "Wed", avg: 5200 },
    { day: "Thu", avg: 4100 },
    { day: "Fri", avg: 6800 },
    { day: "Sat", avg: 12500 },
    { day: "Sun", avg: 14000 },
];

const sourceData = [
    { name: "Website", value: 65 },
    { name: "UPI Direct", value: 25 },
    { name: "Card/Stripe", value: 10 },
];

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

export function CampaignAnalytics() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2"
            >
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Donation Trajectory</h3>
                    <p className="text-sm text-gray-500">Cumulative funds raised over time</p>
                </div>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, "Amount"]}
                            />
                            <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <div className="space-y-6 lg:col-span-1">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-900">Source Breakdown</h3>
                    </div>
                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: any) => [`${value}%`, "Share"]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {sourceData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                {d.name}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

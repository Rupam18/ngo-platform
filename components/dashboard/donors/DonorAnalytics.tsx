"use client";

import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";

const yearlyData = [
    { year: "2023", amount: 15000 },
    { year: "2024", amount: 45000 },
    { year: "2025", amount: 35000 },
    { year: "2026", amount: 30000 },
];

const campaignData = [
    { name: "Education", value: 50 },
    { name: "Relief", value: 30 },
    { name: "Water", value: 20 },
];

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

export function DonorAnalytics() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
                <div className="mb-4">
                    <h3 className="text-gray-900 font-bold">Contribution History</h3>
                    <p className="text-sm text-gray-500">Year over year giving trends</p>
                </div>
                <div className="h-[220px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip
                                cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Donated"]}
                            />
                            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
                <div className="mb-4">
                    <h3 className="text-gray-900 font-bold">Campaign Affinity</h3>
                    <p className="text-sm text-gray-500">Where this donor allocates funds</p>
                </div>
                <div className="h-[180px] w-full mt-4 flex justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={campaignData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                                {campaignData.map((entry, index) => (
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
                <div className="flex justify-center gap-4 mt-4">
                    {campaignData.map((d, i) => (
                        <div key={d.name} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                            {d.name}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

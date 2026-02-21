"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Education", raised: 120000, goal: 150000 },
    { name: "Healthcare", raised: 80000, goal: 100000 },
    { name: "Disaster", raised: 250000, goal: 200000 },
    { name: "Water", raised: 45000, goal: 80000 },
];

export function CampaignPerformanceChart() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
                <p className="text-sm text-gray-500">Raised vs Goal amount</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Amount"]}
                        />
                        <Bar dataKey="raised" fill="#10b981" radius={[4, 4, 0, 0]} name="Raised" maxBarSize={40} />
                        <Bar dataKey="goal" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Goal" maxBarSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

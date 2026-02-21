"use client";

import { motion } from "framer-motion";
import { Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function ExpenseTable() {
    const expenses = [
        { id: "EXP-01", title: "School Supplies Bulk Order", amount: 45000, date: "12 Feb 2026", category: "Supplies" },
        { id: "EXP-02", title: "Logistics and Transport", amount: 12000, date: "15 Feb 2026", category: "Transport" },
        { id: "EXP-03", title: "Volunteer Stipends", amount: 8000, date: "18 Feb 2026", category: "Operations" },
    ];

    const utilizationData = [
        { name: "Utilized", value: 65000 },
        { name: "Remaining", value: 35000 },
    ];
    const COLORS = ["#10b981", "#f1f5f9"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Expenses Log</h3>
                        <p className="text-sm text-gray-500">Track how campaign funds are utilized</p>
                    </div>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg">
                        <Plus size={16} className="mr-2" /> Add Expense
                    </Button>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/80">
                            <TableRow className="border-gray-100">
                                <TableHead className="font-semibold text-gray-600">Expense Title</TableHead>
                                <TableHead className="font-semibold text-gray-600">Category</TableHead>
                                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenses.map((expense) => (
                                <TableRow key={expense.id} className="border-gray-100">
                                    <TableCell className="font-medium text-gray-900">{expense.title}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                            {expense.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">{expense.date}</TableCell>
                                    <TableCell className="text-right text-gray-900 font-semibold">
                                        ₹{expense.amount.toLocaleString("en-IN")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <Receipt size={100} className="absolute -right-4 -top-4 text-emerald-50 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">Fund Utilization</h3>
                <div className="h-[140px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={utilizationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={60}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={4}
                            >
                                {utilizationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Amount"]} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-gray-900">65%</span>
                    </div>
                </div>
                <div className="mt-4 w-full text-left bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Total Utilized</span>
                        <span className="font-semibold text-gray-900">₹65,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Remaining Funds</span>
                        <span className="font-semibold text-emerald-600">₹35,000</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

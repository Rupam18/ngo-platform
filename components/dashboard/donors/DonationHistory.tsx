"use client";

import { motion } from "framer-motion";
import { Download, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function DonationHistory() {
    const history = [
        { id: "TXN-8921", campaign: "Education for All 2026", amount: 15000, method: "UPI", date: "21 Feb 2026", status: "Success" },
        { id: "TXN-7410", campaign: "Monthly Subscription", amount: 5000, method: "Credit Card", date: "01 Feb 2026", status: "Success" },
        { id: "TXN-6502", campaign: "Monthly Subscription", amount: 5000, method: "Credit Card", date: "01 Jan 2026", status: "Success" },
        { id: "TXN-5881", campaign: "Winter Blanket Drive", amount: 10000, method: "UPI", date: "15 Dec 2025", status: "Success" },
        { id: "TXN-4211", campaign: "Monthly Subscription", amount: 5000, method: "Credit Card", date: "01 Dec 2025", status: "Success" },
        { id: "TXN-3091", campaign: "Emergency Relief Fund", amount: 50000, method: "Bank Transfer", date: "12 Nov 2025", status: "Success" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full"
        >
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Donation History</h3>
                    <p className="text-sm text-gray-500">Record of all past contributions</p>
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input placeholder="Search campaigns..." className="pl-9 h-9 text-sm border-gray-200" />
                    </div>
                    <Button variant="outline" size="sm" className="h-9 border-gray-200 text-gray-600">
                        <Filter size={14} className="mr-2" /> Filter
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto flex-1">
                <Table>
                    <TableHeader className="bg-gray-50/80 sticky top-0">
                        <TableRow className="border-gray-100">
                            <TableHead className="font-semibold text-gray-600">Campaign / Purpose</TableHead>
                            <TableHead className="font-semibold text-gray-600">Amount</TableHead>
                            <TableHead className="font-semibold text-gray-600">Method</TableHead>
                            <TableHead className="font-semibold text-gray-600">Date</TableHead>
                            <TableHead className="font-semibold text-gray-600 text-right">Receipt</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((txn) => (
                            <TableRow key={txn.id} className="hover:bg-gray-50/50 border-gray-100">
                                <TableCell>
                                    <p className="font-medium text-gray-900">{txn.campaign}</p>
                                    <p className="text-xs text-gray-400 font-mono mt-0.5">{txn.id}</p>
                                </TableCell>
                                <TableCell className="text-emerald-600 font-semibold">₹{txn.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-gray-50 text-gray-600 font-normal">
                                        {txn.method}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-500 font-medium">{txn.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                        <Download size={14} className="mr-2" /> PDF
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm">
                <span className="text-gray-500">Total displayed: 6 transactions</span>
                <span className="font-bold text-gray-900">Total: ₹90,000</span>
            </div>
        </motion.div>
    );
}

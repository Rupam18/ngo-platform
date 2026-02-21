"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Filter, User } from "lucide-react";
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

export function DonorList() {
    const [searchTerm, setSearchTerm] = useState("");

    const mockDonors = [
        { id: "TXN-8921", name: "Rahul Sharma", email: "rahul.s@example.com", amount: 15000, method: "UPI", date: "21 Feb 2026" },
        { id: "TXN-8920", name: "Priya Patel", email: "priyap@example.com", amount: 5000, method: "Credit Card", date: "20 Feb 2026" },
        { id: "TXN-8919", name: "Anonymous", email: "-", amount: 25000, method: "Bank Transfer", date: "19 Feb 2026" },
        { id: "TXN-8918", name: "Amit Kumar", email: "amit.k@example.com", amount: 2000, method: "UPI", date: "18 Feb 2026" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Recent Donors</h3>
                    <p className="text-sm text-gray-500">People who supported this campaign</p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder="Search donors..."
                            className="pl-9 h-10 border-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="border-gray-200">
                        <Filter size={16} className="mr-2" />
                        Amount
                    </Button>
                    <Button variant="outline" className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-none">
                        <Download size={16} className="mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50/80">
                        <TableRow className="border-gray-100">
                            <TableHead className="font-semibold text-gray-600">Donor</TableHead>
                            <TableHead className="font-semibold text-gray-600">Amount</TableHead>
                            <TableHead className="font-semibold text-gray-600">Payment Method</TableHead>
                            <TableHead className="font-semibold text-gray-600">Date</TableHead>
                            <TableHead className="font-semibold text-gray-600 text-right">Transaction ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockDonors.map((donor) => (
                            <TableRow key={donor.id} className="hover:bg-gray-50/50 border-gray-100 cursor-pointer group">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {donor.name === "Anonymous" ? <User size={14} /> : donor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{donor.name}</p>
                                            <p className="text-xs text-gray-500">{donor.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-emerald-600 font-semibold">₹{donor.amount.toLocaleString("en-IN")}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-gray-50 text-gray-600 font-normal">
                                        {donor.method}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">{donor.date}</TableCell>
                                <TableCell className="text-right font-mono text-xs text-gray-400">{donor.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-center">
                <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 w-full rounded-xl">View All Donors</Button>
            </div>
        </motion.div>
    );
}

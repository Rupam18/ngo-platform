"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, UserCheck, UserX, Mail, RefreshCw, Eye, Edit, Trash2, MoreVertical, Ban, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DonorData {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalDonated: number;
    lastDonated: string;
    type: "One-time" | "Recurring";
    status: "Active" | "Inactive";
    avatarUrl?: string;
}

const mockDonors: DonorData[] = [
    { id: "D_001", name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210", totalDonated: 125000, lastDonated: "21 Feb 2026", type: "Recurring", status: "Active" },
    { id: "D_002", name: "Priya Patel", email: "priyap@example.com", phone: "+91 87654 32109", totalDonated: 45000, lastDonated: "15 Jan 2026", type: "One-time", status: "Inactive" },
    { id: "D_003", name: "Amit Kumar", email: "amit.k@example.com", phone: "+91 76543 21098", totalDonated: 8000, lastDonated: "02 Feb 2026", type: "Recurring", status: "Active" },
    { id: "D_004", name: "Anjali Gupta", email: "anjali.g@example.com", phone: "+91 65432 10987", totalDonated: 250000, lastDonated: "20 Feb 2026", type: "Recurring", status: "Active" },
    { id: "D_005", name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 54321 09876", totalDonated: 10000, lastDonated: "10 Nov 2025", type: "One-time", status: "Inactive" },
    { id: "D_006", name: "Rajesh Iyer", email: "r.iyer@example.com", phone: "+91 43210 98765", totalDonated: 60000, lastDonated: "18 Feb 2026", type: "One-time", status: "Active" },
];

export function DonorTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("All");

    let filtered = mockDonors.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.phone.includes(searchTerm);
        const matchesFilter = filterType === "All" ||
            (filterType === "Recurring" && d.type === "Recurring") ||
            (filterType === "Active" && d.status === "Active") ||
            (filterType === "One-time" && d.type === "One-time") ||
            (filterType === "Top Donors" && d.totalDonated > 50000);
        return matchesSearch && matchesFilter;
    });

    // Helper for initials avatar
    const getInitials = (name: string) => {
        const parts = name.split(" ");
        if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name[0].toUpperCase();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden"
        >
            <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white sticky top-0 z-10">
                <div className="relative w-full lg:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                        placeholder="Search donors by name, email, or phone..."
                        className="pl-9 h-11 border-gray-200 focus:ring-blue-500 rounded-lg bg-gray-50/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {["All", "Active", "Recurring", "Top Donors"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilterType(f)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filterType === f ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <Button variant="outline" className="border-gray-200 h-10 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 hover:text-emerald-800 transition-colors">
                        <Download size={16} className="mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50/80 sticky top-0 z-0">
                        <TableRow className="border-gray-100 hover:bg-transparent">
                            <TableHead className="font-semibold text-gray-600 w-[280px]">Donor Profile</TableHead>
                            <TableHead className="font-semibold text-gray-600">Contact</TableHead>
                            <TableHead className="font-semibold text-gray-600">Total Donated</TableHead>
                            <TableHead className="font-semibold text-gray-600">Type</TableHead>
                            <TableHead className="font-semibold text-gray-600">Last Donation</TableHead>
                            <TableHead className="font-semibold text-gray-600">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filtered.length > 0 ? (
                                filtered.map((donor) => (
                                    <TableRow key={donor.id} className="hover:bg-blue-50/30 border-gray-100 transition-colors group">
                                        <TableCell>
                                            <div className="flex items-center gap-3 py-1">
                                                {donor.avatarUrl ? (
                                                    <img src={donor.avatarUrl} alt={donor.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border border-blue-200">
                                                        {getInitials(donor.name)}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{donor.name}</p>
                                                    <p className="text-xs text-gray-400 font-mono">{donor.id}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Mail size={12} className="mr-2 text-gray-400" />
                                                    {donor.email}
                                                </div>
                                                <div className="text-xs text-gray-400">{donor.phone}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 font-bold text-gray-900">
                                                <span className="text-emerald-500">₹</span>
                                                {donor.totalDonated.toLocaleString()}
                                            </div>
                                            {donor.totalDonated > 50000 && <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded ml-1">High Value</span>}
                                        </TableCell>
                                        <TableCell>
                                            {donor.type === "Recurring" ? (
                                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 gap-1.5 font-normal">
                                                    <RefreshCw size={12} /> Recurring
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 gap-1.5 font-normal">
                                                    One-time
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500 font-medium">
                                            {donor.lastDonated}
                                        </TableCell>
                                        <TableCell>
                                            {donor.status === "Active" ? (
                                                <div className="flex items-center text-emerald-600 text-sm font-medium gap-1.5">
                                                    <UserCheck size={16} /> Active
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-gray-400 text-sm font-medium gap-1.5">
                                                    <UserX size={16} /> Inactive
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
                                                        <MoreVertical size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-gray-100 p-1">
                                                    <Link href={`/dashboard/donors/${donor.id}`}>
                                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg">
                                                            <Eye size={16} className="mr-2 text-blue-500" /> View Profile
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg">
                                                        <Mail size={16} className="mr-2 text-emerald-500" /> Send Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg">
                                                        <Edit size={16} className="mr-2 text-gray-500" /> Edit Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-gray-100 my-1" />
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-red-50 text-red-700 rounded-lg focus:text-red-700 focus:bg-red-50">
                                                        <Ban size={16} className="mr-2" /> Block Donor
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-[300px] text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                                                <ShieldAlert size={28} className="text-gray-300" />
                                            </div>
                                            <p className="text-lg font-bold text-gray-900 mb-1">No donors found</p>
                                            <p className="text-sm">We couldn't find any donors matching your criteria.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
                <span className="font-medium text-gray-700">Showing {filtered.length} of {mockDonors.length} total donors</span>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled className="rounded-lg bg-white border-gray-200">Previous</Button>
                    <Button variant="outline" size="sm" disabled className="rounded-lg bg-white border-gray-200 text-gray-900 font-medium">1</Button>
                    <Button variant="outline" size="sm" disabled className="rounded-lg bg-white border-gray-200">Next</Button>
                </div>
            </div>
        </motion.div>
    );
}

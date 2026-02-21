"use client";

import { motion } from "framer-motion";
import { Search, Filter, RefreshCw, AlertCircle, CheckCircle, CreditCard, Clock } from "lucide-react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, XCircle, Play } from "lucide-react";

export default function RecurringDonationsPage() {
    const subscriptions = [
        { id: "SUB-1049", donor: "Rahul Sharma", plan: "₹5,000 / month", campaign: "General Fund", nextBilling: "01 Mar 2026", method: "💳 •••• 4242", status: "Active" },
        { id: "SUB-1082", donor: "Amit Kumar", plan: "₹2,500 / month", campaign: "Education Initiative", nextBilling: "15 Mar 2026", method: "🏛️ HDFC Bank", status: "Active" },
        { id: "SUB-0992", donor: "Vikas Sethi", plan: "₹10,000 / month", campaign: "Orphanage Support", nextBilling: "28 Feb 2026", method: "💳 •••• 1928", status: "Failed" },
        { id: "SUB-0871", donor: "Meera Gupta", plan: "₹1,000 / month", campaign: "Tree Plantation", nextBilling: "05 Mar 2026", method: "💳 •••• 8841", status: "Active" },
        { id: "SUB-0654", donor: "Suresh Nair", plan: "₹5,000 / month", campaign: "General Fund", nextBilling: "10 Mar 2026", method: "💳 •••• 3341", status: "Cancelled" },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Recurring Donations</h1>
                    <p className="text-gray-500 mt-1">Manage active subscriptions, predict revenue, and catch failed payments.</p>
                </div>
            </div>

            {/* Quick Stats for Recurring */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-2">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 text-emerald-600 mb-2">
                        <CheckCircle size={20} /> <span className="font-semibold text-sm uppercase tracking-wide text-gray-500">Active Subs</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">412</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 text-blue-600 mb-2">
                        <RefreshCw size={20} /> <span className="font-semibold text-sm uppercase tracking-wide text-gray-500">Monthly MRR</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">₹8.5L</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-5 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -z-10" />
                    <div className="flex items-center gap-3 text-red-600 mb-2">
                        <AlertCircle size={20} /> <span className="font-semibold text-sm uppercase tracking-wide text-gray-500">Failed Payments</span>
                    </div>
                    <p className="text-3xl font-bold text-red-600">14</p>
                    <p className="text-xs text-red-500 mt-1 font-medium">Requires attention & retry</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                        <Clock size={20} /> <span className="font-semibold text-sm uppercase tracking-wide text-gray-500">Upcoming (7 Days)</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">₹1.2L</p>
                </motion.div>
            </div>

            {/* Table Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white">
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input placeholder="Search donor or subscription ID..." className="pl-9 h-11 border-gray-200 rounded-lg bg-gray-50/50" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            {["All", "Active", "Failed", "Cancelled"].map((f) => (
                                <button key={f} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${f === "All" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/80">
                            <TableRow className="border-gray-100">
                                <TableHead className="font-semibold text-gray-600">Subscription ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Donor & Plan</TableHead>
                                <TableHead className="font-semibold text-gray-600">Campaign</TableHead>
                                <TableHead className="font-semibold text-gray-600">Next Billing</TableHead>
                                <TableHead className="font-semibold text-gray-600">Payment Method</TableHead>
                                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions.map((sub) => (
                                <TableRow key={sub.id} className="hover:bg-blue-50/30 border-gray-100">
                                    <TableCell className="font-mono text-xs text-gray-500">{sub.id}</TableCell>
                                    <TableCell>
                                        <p className="font-semibold text-gray-900">{sub.donor}</p>
                                        <p className="text-emerald-600 font-medium text-sm">{sub.plan}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-gray-50 text-gray-600 font-normal">{sub.campaign}</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600 font-medium">{sub.nextBilling}</TableCell>
                                    <TableCell className="text-gray-500 font-medium">{sub.method}</TableCell>
                                    <TableCell>
                                        {sub.status === "Active" && <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5"><CheckCircle size={12} /> Active</Badge>}
                                        {sub.status === "Failed" && <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1.5 animate-pulse"><AlertCircle size={12} /> Failed</Badge>}
                                        {sub.status === "Cancelled" && <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 gap-1.5"><XCircle size={12} /> Cancelled</Badge>}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-gray-100 p-1">
                                                {sub.status === "Failed" && (
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 text-blue-700 rounded-lg font-medium mb-1">
                                                        <Play size={16} className="mr-2" /> Retry Payment
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg">
                                                    <CreditCard size={16} className="mr-2 text-gray-500" /> Update Card Info
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer hover:bg-red-50 text-red-700 rounded-lg focus:text-red-700 focus:bg-red-50 mt-1">
                                                    <XCircle size={16} className="mr-2" /> Cancel Subscription
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        </div>
    );
}

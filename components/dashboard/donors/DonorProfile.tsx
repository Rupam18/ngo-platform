"use client";

import { motion } from "framer-motion";
import { Mail, Edit, Download, CheckCircle, RefreshCw, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DonorProfile() {
    const donorInfo = {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra",
        status: "Active",
        type: "Recurring",
        totalDonated: 125000,
        firstDonation: "12 May 2024",
        latestDonation: "21 Feb 2026",
    };

    const getInitials = (name: string) => {
        const p = name.split(" ");
        if (p.length > 1) return (p[0][0] + p[1][0]).toUpperCase();
        return name[0].toUpperCase();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
            <div className="h-32 w-full bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            </div>

            <div className="px-6 md:px-8 pb-6 md:pb-8 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 -mt-12 md:-mt-16 mb-6">
                    <div className="flex items-end gap-5">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white p-1.5 shadow-md">
                            <div className="w-full h-full rounded-xl bg-blue-100 text-blue-700 font-bold text-3xl flex items-center justify-center border border-blue-200">
                                {getInitials(donorInfo.name)}
                            </div>
                        </div>
                        <div className="pb-2">
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{donorInfo.name}</h1>
                                {donorInfo.totalDonated > 50000 && (
                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-semibold px-2 py-0.5">
                                        Gold Tier
                                    </Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1.5"><Mail size={14} className="text-gray-400" /> {donorInfo.email}</span>
                                <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-400" /> {donorInfo.phone}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {donorInfo.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <Button variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-700 max-md:flex-1">
                            <Edit size={16} className="mr-2 text-gray-500" /> Edit
                        </Button>
                        <Button variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 max-md:flex-1">
                            <Mail size={16} className="mr-2" /> Thank You
                        </Button>
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm max-md:flex-1">
                            <Download size={16} className="mr-2" /> Download Report
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Lifetime Value</p>
                        <p className="text-2xl font-bold text-gray-900">₹{donorInfo.totalDonated.toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                        {donorInfo.status === "Active" ? (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 text-sm py-1 font-medium mt-0.5">
                                <CheckCircle size={14} /> Active Donor
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 text-sm py-1 font-medium mt-0.5">
                                Inactive
                            </Badge>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Commitment</p>
                        {donorInfo.type === "Recurring" ? (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 gap-1.5 text-sm py-1 font-medium mt-0.5">
                                <RefreshCw size={14} /> Recurring Monthly
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 text-sm py-1 font-medium mt-0.5">
                                One-time Only
                            </Badge>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">First & Last Gift</p>
                        <p className="text-sm font-semibold text-gray-900">{donorInfo.firstDonation}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Last: {donorInfo.latestDonation}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

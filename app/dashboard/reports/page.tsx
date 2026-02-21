"use client";

import { motion } from "framer-motion";
import { Upload, Download, FileText, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FundUtilizationChart } from "@/components/dashboard/FundUtilizationChart";
import { DonationChart } from "@/components/dashboard/DonationChart";

const auditLogs = [
    { id: 1, user: "Admin", action: "Exported Q1 Financial Report", date: "2026-02-21 10:30 AM" },
    { id: 2, user: "System", action: "Automated Monthly Backup Completed", date: "2026-02-20 00:00 AM" },
    { id: 3, user: "Priya (Manager)", action: "Approved Campaign: Clean Water", date: "2026-02-18 14:20 PM" },
    { id: 4, user: "Admin", action: "Refunded Transaction DON1024", date: "2026-02-15 09:15 AM" },
    { id: 5, user: "System", action: "Failed Login Attempt Detected", date: "2026-02-14 22:45 PM" },
];

export default function ReportsPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Reports & Transparency</h1>
                    <p className="text-gray-500 mt-1">Review financial summaries, expenses, and security audit logs.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-gray-200">
                        <Upload size={16} className="mr-2" />
                        Upload PDF Repo
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Download size={16} className="mr-2" />
                        Download All
                    </Button>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col h-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 pointer-events-none">
                        <ShieldCheck size={100} className="text-emerald-50 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="relative z-10 flex-1 flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <FileText size={20} className="text-emerald-600" />
                            Monthly Donation Summary
                        </h2>
                        <div className="-mx-6 -mb-6 flex-1">
                            <DonationChart />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10 flex-1 flex flex-col">
                        <div className="-mx-6 -mt-6 -mb-6 flex-1">
                            <FundUtilizationChart />
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Audit Log */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <AlertCircle size={20} className="text-red-500" />
                            Security & Audit Log
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Recent critical actions and system events.</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                        View Complete Log
                    </Button>
                </div>

                <div className="px-6 py-4">
                    <div className="space-y-4">
                        {auditLogs.map((log) => (
                            <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-4 mb-2 sm:mb-0">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm text-xs font-bold text-gray-600">
                                        {log.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Performed by <span className="font-medium text-gray-700">{log.user}</span></p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 font-medium sm:text-right">{log.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

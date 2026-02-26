"use client";

import { motion } from "framer-motion";
import { FileText, Download, UploadCloud, ShieldCheck, Mail, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CompliancePage() {
    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col flex-wrap justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Receipts & Compliance</h1>
                    <p className="text-gray-500 mt-1">Manage 80G tax certificates, generate annual summaries, and audit logs.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 border-gray-200">
                        <UploadCloud size={18} className="mr-2 text-gray-400" />
                        Bulk Upload
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all h-11 px-6 rounded-lg font-medium">
                        <Calculator size={18} className="mr-2" />
                        Generate Annual Summary
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Manual Receipt Generation */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                        <FileText size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Generate Manual Receipt</h3>
                    <p className="text-gray-500 text-sm mb-6">Create a single, formatted PDF donation receipt for offline contributions or corrections.</p>
                    <Button className="w-full !bg-blue-50 !text-blue-700 hover:!bg-blue-100 border-none shadow-none font-semibold">
                        Create Receipt
                    </Button>
                </motion.div>

                {/* 80G Certificate Portal */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">80G Tax Certificates</h3>
                    <p className="text-gray-500 text-sm mb-6">Verify donor PAN details and issue Section 80G certificates for tax exemption benefits.</p>
                    <Button className="w-full !bg-emerald-50 !text-emerald-700 hover:!bg-emerald-100 border-none shadow-none font-semibold">
                        Manage 80G Queue
                    </Button>
                </motion.div>

                {/* Annual Tax Statements */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                        <Mail size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Annual Tax Statements</h3>
                    <p className="text-gray-500 text-sm mb-6">Automatically send a PDF summary of all donations made in the fiscal year.</p>
                    <Button className="w-full !bg-purple-50 !text-purple-700 hover:!bg-purple-100 border-none shadow-none font-semibold">
                        Dispatch FY2025 Reports
                    </Button>
                </motion.div>

            </div>

            {/* Recent generated documents table placeholder */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recently Generated Documents</h3>
                <div className="overflow-x-auto text-sm text-left text-gray-500">
                    <table className="w-full">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-3 rounded-l-lg">Document ID</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Donor Name</th>
                                <th className="px-6 py-3">Date Generated</th>
                                <th className="px-6 py-3 rounded-r-lg text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-mono text-xs">DOC-9812A</td>
                                <td className="px-6 py-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">80G Form</span></td>
                                <td className="px-6 py-4 font-medium text-gray-900">Rahul Sharma</td>
                                <td className="px-6 py-4">21 Feb 2026</td>
                                <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="h-8"><Download size={14} /></Button></td>
                            </tr>
                            <tr className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-mono text-xs">DOC-9811A</td>
                                <td className="px-6 py-4"><span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-medium">Receipt</span></td>
                                <td className="px-6 py-4 font-medium text-gray-900">Priya Patel</td>
                                <td className="px-6 py-4">20 Feb 2026</td>
                                <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="h-8"><Download size={14} /></Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>

        </div>
    );
}

export default CompliancePage;

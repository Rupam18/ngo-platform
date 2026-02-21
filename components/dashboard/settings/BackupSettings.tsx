"use client";

import { Database, Download, FileText, UploadCloud, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackupSettings() {
    return (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        Backup & Data <Database size={18} className="text-indigo-500" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Export your CRM records, configure automated backups, and manage storage.</p>
                </div>
            </div>

            <div className="space-y-8 max-w-4xl">

                {/* Data Exports */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Manual Exports (CSV/JSON)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 border border-gray-200 rounded-xl bg-white hover:border-blue-200 transition-colors flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <FileText size={20} />
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">Donor Directory</h4>
                            <p className="text-xs text-gray-500 mb-4 px-2">Export all donor profiles, contact info, and lifetime values.</p>
                            <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                                <Download size={16} className="mr-2" /> Download CSV
                            </Button>
                        </div>
                        <div className="p-5 border border-gray-200 rounded-xl bg-white hover:border-emerald-200 transition-colors flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <FileText size={20} />
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">Transaction Log</h4>
                            <p className="text-xs text-gray-500 mb-4 px-2">Export line-item donation history for accounting reconciliation.</p>
                            <Button variant="outline" className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                                <Download size={16} className="mr-2" /> Download CSV
                            </Button>
                        </div>
                        <div className="p-5 border border-gray-200 rounded-xl bg-white hover:border-purple-200 transition-colors flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                                <FileText size={20} />
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">Campaign Analytics</h4>
                            <p className="text-xs text-gray-500 mb-4 px-2">Export historical performance data for all campaigns.</p>
                            <Button variant="outline" className="w-full text-purple-600 border-purple-200 hover:bg-purple-50">
                                <Download size={16} className="mr-2" /> Download JSON
                            </Button>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* DB Backup */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="md:w-1/3">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Database Snapshots</h3>
                        <p className="text-xs text-gray-500 pr-4">Create a complete SQL dump of your PostgreSQL database for cold storage.</p>
                    </div>
                    <div className="md:w-2/3 w-full p-5 border border-gray-200 rounded-xl bg-white shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                                <Database className="text-gray-400" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Full System Backup</h4>
                                <p className="text-xs text-gray-500">Last backup: Yesterday at 3:00 AM • ~42.5 MB</p>
                            </div>
                        </div>
                        <Button className="bg-gray-900 text-white hover:bg-gray-800">
                            <UploadCloud size={16} className="mr-2" /> Generate Backup
                        </Button>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Maintenance */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="md:w-1/3">
                        <h3 className="text-sm font-semibold text-red-600 mb-1">System Maintenance</h3>
                        <p className="text-xs text-gray-500 pr-4">Perform destructive actions to free up space or reset state.</p>
                    </div>
                    <div className="md:w-2/3 w-full space-y-3">
                        <div className="p-4 border border-red-100 rounded-xl bg-red-50 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-red-900 text-sm">Clear Audit Logs</h4>
                                <p className="text-xs text-red-700 mt-1">Permanently delete system logs older than 90 days.</p>
                            </div>
                            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-100 bg-white">Clear Logs</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

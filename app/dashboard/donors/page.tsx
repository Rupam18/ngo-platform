"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DonorStats } from "@/components/dashboard/donors/DonorStats";
import { DonorTable } from "@/components/dashboard/donors/DonorTable";

export default function DonorsMainPage() {
    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Donor Management</h1>
                    <p className="text-gray-500 mt-1">Acquire, retain, and manage relations with your supporters.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 border-gray-200">
                        View Analytics
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95 h-11 px-6 rounded-lg font-medium">
                        <Plus size={18} className="mr-2" />
                        Add Donor
                    </Button>
                </div>
            </div>

            {/* Donor Overview Cards */}
            <DonorStats />

            {/* Upgraded Advanced Donor Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="flex items-center justify-between mb-4 mt-2">
                    <h2 className="text-lg font-bold text-gray-900">Donor Directory</h2>
                </div>
                <DonorTable />
            </motion.div>
        </div>
    );
}

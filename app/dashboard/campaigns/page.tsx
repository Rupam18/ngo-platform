"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/dashboard/campaigns/CampaignCard";
import { CampaignTable } from "@/components/dashboard/campaigns/CampaignTable";
import { IndianRupee, Flag, Layers, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CampaignsMainPage() {
    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Campaign Management</h1>
                    <p className="text-gray-500 mt-1">Create, monitor, and manage your fundraising campaigns.</p>
                </div>
                <Link href="/dashboard/campaigns/create">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 h-11 px-6 rounded-lg font-medium">
                        <Plus size={18} className="mr-2" />
                        Create Campaign
                    </Button>
                </Link>
            </div>

            {/* Campaign Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CampaignCard
                    title="Total Campaigns"
                    value={42}
                    icon={Layers}
                    trend={12.5}
                    delay={0.1}
                />
                <CampaignCard
                    title="Active Campaigns"
                    value={18}
                    icon={Flag}
                    trend={4.1}
                    delay={0.2}
                />
                <CampaignCard
                    title="Total Raised"
                    value={new Intl.NumberFormat("en-IN").format(4850000)}
                    prefix="₹"
                    icon={IndianRupee}
                    trend={8.2}
                    delay={0.3}
                />
                <CampaignCard
                    title="Avg. Completion"
                    value="78"
                    suffix="%"
                    icon={CheckCircle}
                    trend={1.2}
                    delay={0.4}
                />
            </div>

            {/* Upgraded Advanced Campaign Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pb-12"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">All Campaigns</h2>
                </div>
                <CampaignTable />
            </motion.div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CampaignForm } from "@/components/dashboard/campaigns/CampaignForm";

export default function CreateCampaignPage() {
    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-4 pb-20">
            {/* Top Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer w-fit"
            >
                <Link href="/dashboard/campaigns" className="flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Campaigns
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Campaign</h1>
                <p className="text-gray-500 mt-1">Fill out the details below to launch a new fundraising initiative.</p>

                <CampaignForm />
            </motion.div>
        </div>
    );
}

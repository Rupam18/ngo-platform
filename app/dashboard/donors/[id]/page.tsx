"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DonorProfile } from "@/components/dashboard/donors/DonorProfile";
import { DonationHistory } from "@/components/dashboard/donors/DonationHistory";
import { DonorAnalytics } from "@/components/dashboard/donors/DonorAnalytics";
import { DonorNotes } from "@/components/dashboard/donors/DonorNotes";

export default function DonorDetailsPage() {
    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
            {/* Top Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer w-fit"
            >
                <Link href="/dashboard/donors" className="flex items-center gap-2 font-medium">
                    <ArrowLeft size={16} /> Back to Donor Directoy
                </Link>
            </motion.div>

            {/* Profile Overview (Hero) */}
            <DonorProfile />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Analytics & Notes */}
                <div className="xl:col-span-1 flex flex-col gap-8">
                    <DonorAnalytics />
                    <DonorNotes />
                </div>

                {/* Right Column: Donation History */}
                <div className="xl:col-span-2">
                    <DonationHistory />
                </div>
            </div>
        </div>
    );
}

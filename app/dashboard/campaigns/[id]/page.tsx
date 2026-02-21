"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Edit, ExternalLink, Share2, Archive } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CampaignStats } from "@/components/dashboard/campaigns/CampaignStats";
import { CampaignAnalytics } from "@/components/dashboard/campaigns/CampaignAnalytics";
import { DonorList } from "@/components/dashboard/campaigns/DonorList";
import { ExpenseTable } from "@/components/dashboard/campaigns/ExpenseTable";
import { CampaignTimeline } from "@/components/dashboard/campaigns/CampaignTimeline";

export default function CampaignDetailsPage() {
    // Mock Data for the specific campaign
    const campaignInfo = {
        title: "Education for All 2026",
        status: "Active",
        goal: 100000,
        raised: 85000,
        remaining: 15000,
        category: "Education",
        bannerImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
    };

    const statsData = {
        totalDonations: 85000,
        uniqueDonors: 142,
        averageDonation: 598,
        largestDonation: 5000,
        conversionRate: 12.4,
        durationDays: 45
    };

    const progress = Math.min(100, Math.round((campaignInfo.raised / campaignInfo.goal) * 100));

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
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

            {/* Campaign Header Profile */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="h-48 md:h-64 w-full relative">
                    <img src={campaignInfo.bannerImage} alt="Campaign Header" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="text-white">
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none text-white mb-3">
                                {campaignInfo.status}
                            </Badge>
                            <h1 className="text-3xl md:text-4xl font-bold mb-1">{campaignInfo.title}</h1>
                            <p className="text-gray-200">{campaignInfo.category} Campagin</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-md">
                                <Share2 size={16} className="mr-2" /> Share
                            </Button>
                            <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-md">
                                <ExternalLink size={16} className="mr-2" /> View Public
                            </Button>
                            <Link href="/dashboard/campaigns/create?edit=cm_1">
                                <Button className="bg-white text-gray-900 hover:bg-gray-100 border-none shadow-md shadow-black/10">
                                    <Edit size={16} className="mr-2" /> Edit Info
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-white border-t border-gray-100">
                    <div className="md:col-span-2">
                        <div className="flex justify-between text-sm mb-2 text-gray-600 font-medium">
                            <span>₹{campaignInfo.raised.toLocaleString()} Raised</span>
                            <span>{progress}% of ₹{campaignInfo.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={progress} className="h-4 bg-gray-100 [&>div]:bg-emerald-500 rounded-full" />
                        <p className="text-sm text-gray-400 mt-2">{"₹" + campaignInfo.remaining.toLocaleString()} remaining to hit the goal.</p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                            <Archive size={16} className="mr-2" /> Archive Campaign
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Two Column Layout: Main Content (Left) & Timeline (Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Left Column (Analytics) */}
                <div className="xl:col-span-3 space-y-8">
                    <CampaignStats stats={statsData} />
                    <CampaignAnalytics />
                    <ExpenseTable />
                    <DonorList />
                </div>

                {/* Right Column (Timeline) */}
                <div className="xl:col-span-1 border-gray-100 rounded-2xl bg-white sticky top-24 h-[800px]">
                    <CampaignTimeline />
                </div>
            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { IndianRupee, Users, Flag, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DonationChart } from "@/components/dashboard/DonationChart";
import { CampaignPerformanceChart } from "@/components/dashboard/CampaignPerformanceChart";
import { FundUtilizationChart } from "@/components/dashboard/FundUtilizationChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CampaignTable } from "@/components/dashboard/CampaignTable";

export default function DashboardHomePage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back. Here's what's happening with your NGO today.</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Total Raised"
                    value={new Intl.NumberFormat("en-IN").format(2450000)}
                    prefix="₹"
                    icon={IndianRupee}
                    trend={12.5}
                    delay={0.1}
                />
                <StatCard
                    title="Total Donors"
                    value="1,432"
                    icon={Users}
                    trend={8.2}
                    delay={0.2}
                />
                <StatCard
                    title="Active Campaigns"
                    value="24"
                    icon={Flag}
                    trend={4.1}
                    delay={0.3}
                />
                <StatCard
                    title="Completed Campaigns"
                    value="156"
                    icon={CheckCircle}
                    trend={1.2}
                    delay={0.4}
                />
                <StatCard
                    title="Monthly Growth"
                    value="18.5%"
                    icon={TrendingUp}
                    trend={5.4}
                    delay={0.5}
                />
                <StatCard
                    title="Pending Approvals"
                    value="7"
                    icon={Clock}
                    trend={-2.1}
                    delay={0.6}
                />
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <DonationChart />
                    <CampaignPerformanceChart />
                </div>
                <div className="space-y-6 flex flex-col">
                    <FundUtilizationChart />
                    <div className="flex-1">
                        <RecentActivity />
                    </div>
                </div>
            </div>

            {/* Tables Section */}
            <div className="pb-8">
                <CampaignTable />
            </div>
        </div>
    );
}

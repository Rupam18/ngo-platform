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
            {/* RISO Branded Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-red-900 to-rose-900 p-8 md:p-10 shadow-xl border border-red-900/50"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            SYSTEM ONLINE
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            RISO Command Center
                        </h1>
                        <p className="text-red-100/80 max-w-xl text-sm md:text-base">
                            Welcome back, Admin. Monitor platform performance, track donations, and review compliance metrics in real-time.
                        </p>
                    </div>

                    <div className="hidden md:flex bg-white p-4 rounded-xl shadow-lg border border-red-500/20 items-center justify-center">
                        <div className="relative h-14 w-36">
                            <img
                                src="/RISO_LOGO_Final2.png"
                                alt="RISO Logo"
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

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

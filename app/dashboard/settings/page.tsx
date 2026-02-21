"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, Building2, CreditCard, HeartHandshake,
    Mail, ShieldCheck, Users, Palette, Blocks, Database, Scale
} from "lucide-react";

import { GeneralSettings } from "@/components/dashboard/settings/GeneralSettings";
import { OrgProfileSettings } from "@/components/dashboard/settings/OrgProfileSettings";
import { PaymentSettings } from "@/components/dashboard/settings/PaymentSettings";
import { DonationSettings } from "@/components/dashboard/settings/DonationSettings";
import { EmailSettings } from "@/components/dashboard/settings/EmailSettings";
import { SecuritySettings } from "@/components/dashboard/settings/SecuritySettings";
import { RolesPermissions } from "@/components/dashboard/settings/RolesPermissions";
import { AppearanceSettings } from "@/components/dashboard/settings/AppearanceSettings";
import { IntegrationsSettings } from "@/components/dashboard/settings/IntegrationsSettings";
import { BackupSettings } from "@/components/dashboard/settings/BackupSettings";
import { LegalSettings } from "@/components/dashboard/settings/LegalSettings";

const SETTINGS_TABS = [
    { id: "general", label: "General", icon: Settings, component: GeneralSettings },
    { id: "profile", label: "Organization Profile", icon: Building2, component: OrgProfileSettings },
    { id: "payment", label: "Payment Gateways", icon: CreditCard, component: PaymentSettings },
    { id: "donation", label: "Donation Preferences", icon: HeartHandshake, component: DonationSettings },
    { id: "email", label: "Email & Notifications", icon: Mail, component: EmailSettings },
    { id: "security", label: "Security & Access", icon: ShieldCheck, component: SecuritySettings },
    { id: "roles", label: "Roles & Permissions", icon: Users, component: RolesPermissions },
    { id: "appearance", label: "Appearance", icon: Palette, component: AppearanceSettings },
    { id: "integrations", label: "Integrations", icon: Blocks, component: IntegrationsSettings },
    { id: "backup", label: "Backup & Data", icon: Database, component: BackupSettings },
    { id: "legal", label: "Legal & Compliance", icon: Scale, component: LegalSettings },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState(SETTINGS_TABS[0].id);

    const ActiveComponent = SETTINGS_TABS.find(t => t.id === activeTab)?.component || GeneralSettings;

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 pb-20">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Platform Settings</h1>
                <p className="text-gray-500 mt-1">Configure your NGO workspace, integrations, and security policies.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Mini Sidebar Nav */}
                <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sticky top-24">
                    <nav className="flex flex-col gap-1">
                        {SETTINGS_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                        ? "bg-blue-50 text-blue-700 shadow-[inset_2px_0_0_0_#3b82f6]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <tab.icon size={18} className={activeTab === tab.id ? "text-blue-600" : "text-gray-400"} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                            <ActiveComponent />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

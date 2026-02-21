"use client";

import { useState } from "react";
import { Save, CheckCircle2, Blocks, Activity, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function IntegrationsSettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // Toggles
    const [activeGoogle, setActiveGoogle] = useState(true);
    const [activeFB, setActiveFB] = useState(false);
    const [activeWA, setActiveWA] = useState(true);
    const [activeZapier, setActiveZapier] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 800);
    };

    const IntegrationCard = ({ title, desc, icon, active, setActive, children }: any) => (
        <div className={`p-5 rounded-2xl border transition-all ${active ? 'border-blue-100 bg-blue-50/20' : 'border-gray-200 bg-white'}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm text-2xl">
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{title}</h3>
                        <p className="text-xs text-gray-500 mt-1 max-w-sm">{desc}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${active ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setActive(!active)}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    {active ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                            <Activity size={10} /> Active
                        </span>
                    ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Disabled</span>
                    )}
                </div>
            </div>
            {active && (
                <div className="mt-4 pt-4 border-t border-gray-100/50 space-y-4">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        Integrations <Blocks size={18} className="text-pink-500" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Connect your dashboard with external analytics, marketing, and automation tools.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm transition-all"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    ) : saved ? (
                        <CheckCircle2 size={16} className="mr-2 text-emerald-400" />
                    ) : (
                        <Save size={16} className="mr-2" />
                    )}
                    {saved ? "Saved" : "Save Changes"}
                </Button>
            </div>

            <div className="space-y-6 max-w-3xl">

                <IntegrationCard
                    title="Google Analytics 4"
                    desc="Track visitor behavior and donation conversion funnels."
                    icon="📊"
                    active={activeGoogle}
                    setActive={setActiveGoogle}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Measurement ID</label>
                        <Input defaultValue="G-K7891XYZ2" className="border-gray-200 font-mono text-sm bg-white" />
                    </div>
                </IntegrationCard>

                <IntegrationCard
                    title="Facebook Pixel"
                    desc="Measure cross-device ad conversions and build custom donor audiences."
                    icon="📘"
                    active={activeFB}
                    setActive={setActiveFB}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pixel ID</label>
                        <Input placeholder="Enter your 15-digit Pixel ID" className="border-gray-200 font-mono text-sm bg-white" />
                    </div>
                </IntegrationCard>

                <IntegrationCard
                    title="WhatsApp Business API"
                    desc="Send automated tax receipts and personalized thank-you messages directly to donors' WhatsApp."
                    icon="💬"
                    active={activeWA}
                    setActive={setActiveWA}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number ID</label>
                            <Input defaultValue="104882910" className="border-gray-200 font-mono text-sm bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">System User Token</label>
                            <Input type="password" defaultValue="EAACx..." className="border-gray-200 font-mono text-sm bg-white" />
                        </div>
                    </div>
                </IntegrationCard>

                <IntegrationCard
                    title="Zapier Webhook"
                    desc="Trigger hundreds of custom workflows whenever a new donation is successfully processed."
                    icon="⚡"
                    active={activeZapier}
                    setActive={setActiveZapier}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Catch URL</label>
                        <Input placeholder="https://hooks.zapier.com/hooks/catch/..." className="border-gray-200 font-mono text-sm bg-white" />
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-3 mt-4">
                        <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <strong>Beta feature.</strong> The webhook payload will include the Donor's Name, Email, and Total Amount.
                        </div>
                    </div>
                </IntegrationCard>

            </div>
        </div>
    );
}

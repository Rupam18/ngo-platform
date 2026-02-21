"use client";

import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DonationSettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // Toggles
    const [allowAnon, setAllowAnon] = useState(true);
    const [allowRecurring, setAllowRecurring] = useState(true);
    const [autoReceipt, setAutoReceipt] = useState(true);
    const [autoThankYou, setAutoThankYou] = useState(true);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 800);
    };

    const ToggleRow = ({ title, description, state, setState }: any) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div className="pr-4">
                <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{description}</p>
            </div>
            <div
                className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors shrink-0 ${state ? 'bg-emerald-500' : 'bg-gray-300'}`}
                onClick={() => setState(!state)}
            >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${state ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Donation Preferences</h2>
                    <p className="text-sm text-gray-500 mt-1">Configure limits, suggested amounts, and automated workflows.</p>
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

            <div className="space-y-6 max-w-2xl">

                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Amounts & Limits</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Donation (₹)</label>
                        <Input type="number" defaultValue="100" className="border-gray-200" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Suggested Amounts</label>
                    <p className="text-xs text-gray-500 mb-3">Comma-separated values to display on the public donation page.</p>
                    <div className="flex gap-3 items-center">
                        <Input defaultValue="500, 1000, 5000, 10000" className="border-gray-200 font-mono text-sm max-w-md" />
                    </div>
                </div>

                <div className="pt-6">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Experience Workflows</h3>
                    <div className="bg-white border border-gray-100 rounded-xl px-5 py-2 mt-4 shadow-sm">

                        <ToggleRow
                            title="Allow Anonymous Donations"
                            description="Donors can choose to hide their name from public campaign leaderboards."
                            state={allowAnon} setState={setAllowAnon}
                        />

                        <ToggleRow
                            title="Enable Recurring Donations"
                            description="Show the 'Donate Monthly' toggle on your checkout forms."
                            state={allowRecurring} setState={setAllowRecurring}
                        />

                        <ToggleRow
                            title="Auto-Generate Receipts"
                            description="Instantly generate and attach a PDF receipt when a payment succeeds."
                            state={autoReceipt} setState={setAutoReceipt}
                        />

                        <ToggleRow
                            title="Automated Thank You Emails"
                            description="Send a personalized thank you note (customizable per campaign) immediately after donation."
                            state={autoThankYou} setState={setAutoThankYou}
                        />

                    </div>
                </div>

            </div>
        </div>
    );
}

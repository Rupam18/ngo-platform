"use client";

import { useState } from "react";
import { Save, CheckCircle2, Server, EyeOff, Eye, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EmailSettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showSmtpPass, setShowSmtpPass] = useState(false);

    // Notification toggles
    const [newDonation, setNewDonation] = useState(true);
    const [largeDonation, setLargeDonation] = useState(true);
    const [goalReached, setGoalReached] = useState(true);
    const [recurringFailed, setRecurringFailed] = useState(true);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 800);
    };

    const ToggleRow = ({ title, description, state, setState }: any) => (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 px-2 -mx-2 rounded-lg transition-colors">
            <div className="pr-4">
                <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            </div>
            <div
                className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors shrink-0 ${state ? 'bg-blue-600' : 'bg-gray-300'}`}
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
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        Email & Notifications <Server size={18} className="text-gray-400" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Configure your SMTP server and admin notification preferences.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-gray-200 text-gray-700 bg-white">
                        <Send size={16} className="mr-2 text-gray-400" /> Send Test Email
                    </Button>
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
            </div>

            <div className="space-y-8 max-w-3xl">

                {/* SMTP Setup */}
                <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50/30">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">SMTP Configuration</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                            <Input defaultValue="smtp.sendgrid.net" className="border-gray-200 font-mono text-sm bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                            <Input defaultValue="587" className="border-gray-200 font-mono text-sm bg-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Username / Email</label>
                            <Input defaultValue="apikey" className="border-gray-200 font-mono text-sm bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                            <div className="relative">
                                <Input type={showSmtpPass ? "text" : "password"} defaultValue="SG.xyz123mockpassword" className="border-gray-200 font-mono text-sm bg-white pr-10" />
                                <button type="button" onClick={() => setShowSmtpPass(!showSmtpPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showSmtpPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Default Sender Name</label>
                        <Input defaultValue="Global Hope NGO" className="border-gray-200 bg-white" />
                    </div>
                </div>

                {/* Notifications Toggles */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Admin Alerts</h3>
                    <p className="text-xs text-gray-500 mb-4">Select which events trigger an email notification to the primary support address.</p>

                    <div className="bg-white border border-gray-100 rounded-xl px-4 py-1">
                        <ToggleRow
                            title="New Donation Received"
                            description="Receive an alert for every successful donation."
                            state={newDonation} setState={setNewDonation}
                        />
                        <ToggleRow
                            title="Large Donation Alert"
                            description="Notify immediately if a highly notable donation is made (> ₹10,000)."
                            state={largeDonation} setState={setLargeDonation}
                        />
                        <ToggleRow
                            title="Campaign Goal Reached"
                            description="Email when a public campaign crosses 100% of its funding objective."
                            state={goalReached} setState={setGoalReached}
                        />
                        <ToggleRow
                            title="Recurring Payment Failure"
                            description="Receive a notification if a subscriber's card is declined or fails."
                            state={recurringFailed} setState={setRecurringFailed}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Save, CheckCircle2, Lock, Eye, EyeOff, Activity, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PaymentSettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // UI state for showing/hiding secrets
    const [showRzKey, setShowRzKey] = useState(false);
    const [showStripeKey, setShowStripeKey] = useState(false);

    // Mock initial check statuses
    const [isRazorpayConnected, setIsRazorpayConnected] = useState(true);
    const [isStripeConnected, setIsStripeConnected] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 800);
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        Payment Gateways <Lock size={18} className="text-gray-400" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Configure your primary donation processors and API keys securely.</p>
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

            <div className="space-y-8 max-w-3xl">

                {/* Razorpay Section */}
                <div className={`p-5 rounded-2xl border transition-all ${isRazorpayConnected ? 'border-blue-100 bg-blue-50/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">₹</div>
                            <div>
                                <h3 className="font-bold text-gray-900">Razorpay (India)</h3>
                                <p className="text-xs text-gray-500">Primary gateway for INR donations</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {isRazorpayConnected ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                    <Activity size={12} /> Connected
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    Disabled
                                </span>
                            )}
                            <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${isRazorpayConnected ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setIsRazorpayConnected(!isRazorpayConnected)}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isRazorpayConnected ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Key ID</label>
                            <Input defaultValue="rzp_live_y7n8983hGus2" className="border-gray-200 font-mono text-sm bg-white" disabled={!isRazorpayConnected} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Key Secret</label>
                            <div className="relative">
                                <Input type={showRzKey ? "text" : "password"} defaultValue="secret_key_mock_data_12345" className="border-gray-200 font-mono text-sm bg-white pr-10" disabled={!isRazorpayConnected} />
                                <button type="button" onClick={() => setShowRzKey(!showRzKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" disabled={!isRazorpayConnected}>
                                    {showRzKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stripe Section */}
                <div className={`p-5 rounded-2xl border transition-all ${isStripeConnected ? 'border-indigo-100 bg-indigo-50/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">$</div>
                            <div>
                                <h3 className="font-bold text-gray-900">Stripe (International)</h3>
                                <p className="text-xs text-gray-500">Secondary gateway for USD/EUR</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {isStripeConnected ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                    <Activity size={12} /> Connected
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    Disabled
                                </span>
                            )}
                            <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${isStripeConnected ? 'bg-indigo-600' : 'bg-gray-300'}`} onClick={() => setIsStripeConnected(!isStripeConnected)}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isStripeConnected ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>
                    </div>

                    {isStripeConnected && (
                        <div className="space-y-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Publishable Key</label>
                                <Input placeholder="pk_live_..." className="border-gray-200 font-mono text-sm bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Secret Key</label>
                                <div className="relative">
                                    <Input type={showStripeKey ? "text" : "password"} placeholder="sk_live_..." className="border-gray-200 font-mono text-sm bg-white pr-10" />
                                    <button type="button" onClick={() => setShowStripeKey(!showStripeKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showStripeKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-3 mt-4">
                                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    <strong>Webhook required.</strong> You must configure your Stripe webhooks to point to <code className="bg-amber-100 px-1 py-0.5 rounded ml-1 text-amber-900">https://yourdomain.com/api/webhooks/stripe</code> to capture recurring events.
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Global Settings */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">Test Mode (Sandbox)</h4>
                        <p className="text-xs text-gray-500">Use test API keys instead of live keys. Transactions will not be charged.</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-amber-500 flex items-center px-1 cursor-pointer">
                        <div className="w-4 h-4 rounded-full bg-white shadow-sm translate-x-5 transition-transform" />
                    </div>
                </div>

            </div>
        </div>
    );
}

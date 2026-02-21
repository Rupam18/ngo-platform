"use client";

import { useState } from "react";
import { Save, CheckCircle2, Scale, FileSignature, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LegalSettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const [cookieConsent, setCookieConsent] = useState(true);

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
                        Legal & Compliance <Scale size={18} className="text-gray-500" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage public-facing policies and regulatory document templates.</p>
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

                {/* Policies */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Public Policies</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="block text-sm font-medium text-gray-700">Terms and Conditions</label>
                                <span className="text-xs text-blue-600 hover:underline cursor-pointer">View Live Page</span>
                            </div>
                            <textarea
                                className="w-full h-32 p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50/50 font-mono"
                                defaultValue={`1. ACCEPTANCE OF TERMS\nBy accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement...\n\n2. DONATION POLICY\nAll donations made to the NGO are non-refundable unless explicitly stated otherwise passing a 30-day review period.`}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="block text-sm font-medium text-gray-700">Privacy Policy</label>
                                <span className="text-xs text-blue-600 hover:underline cursor-pointer">View Live Page</span>
                            </div>
                            <textarea
                                className="w-full h-32 p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50/50 font-mono"
                                defaultValue={`We respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website...`}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Cookie Banner */}
                <div className="flex items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                    <div className="pr-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                            🍪
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">EU Cookie Consent Banner</h4>
                            <p className="text-xs text-gray-500 mt-1 max-w-md">Display a cookie tracking consent banner to new visitors to comply with GDPR and international privacy regulations.</p>
                        </div>
                    </div>
                    <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors shrink-0 ${cookieConsent ? 'bg-orange-400' : 'bg-gray-300'}`} onClick={() => setCookieConsent(!cookieConsent)}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${cookieConsent ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Tax Template Editor */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Tax Receipt Customization</h3>
                    <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                        <div className="flex items-center gap-3 mb-4 text-gray-700">
                            <FileSignature size={20} />
                            <h4 className="font-medium text-sm">Footer Signature / Declaration</h4>
                        </div>
                        <textarea
                            className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
                            defaultValue="This receipt is computer generated and requires no physical signature. Valid for tax exemption under section 80G of the Income Tax Act, 1961."
                        />
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                            <AlertCircle size={14} /> This text will appear at the bottom of all automated PDFs.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

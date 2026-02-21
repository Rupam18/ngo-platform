"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GeneralSettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

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
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">General Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage global configuration for your NGO platform.</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                        <Input defaultValue="Global Hope Foundation" className="border-gray-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                        <Input defaultValue="https://globalhope.ngo" className="border-gray-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                        <Input type="email" defaultValue="contact@globalhope.ngo" className="border-gray-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                        <Input type="tel" defaultValue="+91 98765 43210" className="border-gray-200" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Headquarters Address</label>
                    <textarea
                        className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        defaultValue="12B, Horizon Towers, MG Road, Bangalore, India 560001"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <select className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">America/New_York (EST)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                        <select className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="INR">₹ INR (Indian Rupee)</option>
                            <option value="USD">$ USD (US Dollar)</option>
                            <option value="EUR">€ EUR (Euro)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">System Language</label>
                        <select className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="en">English (US)</option>
                            <option value="hi">Hindi</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Save, CheckCircle2, ShieldAlert, Smartphone, Laptop, Clock, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SecuritySettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // Toggles
    const [twoFactor, setTwoFactor] = useState(false);
    const [ipRestriction, setIpRestriction] = useState(false);

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
                        Security & Access <ShieldAlert size={18} className="text-orange-500" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Protect your administrative account and enforce organizational safety.</p>
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

                {/* Change Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Change Password</h3>
                        <p className="text-xs text-gray-500 pr-4">Ensure your account uses a long, random password to stay secure.</p>
                    </div>
                    <div className="md:col-span-2 space-y-4 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <Input type="password" placeholder="••••••••" className="border-gray-200 bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <Input type="password" placeholder="••••••••" className="border-gray-200 bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <Input type="password" placeholder="••••••••" className="border-gray-200 bg-white" />
                        </div>
                        <Button variant="outline" className="bg-white border-gray-200 text-gray-800 mt-2">Update Password</Button>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Additional Security Measures */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Access Policies</h3>
                        <p className="text-xs text-gray-500 pr-4">Restrict how and when users can log into the dashboard.</p>
                    </div>
                    <div className="md:col-span-2 space-y-4">

                        {/* 2FA */}
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                            <div className="pr-4 flex items-start gap-3">
                                <Smartphone className="text-blue-500 mt-0.5 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-xs text-gray-500 mt-1">Require an authenticator app code to log in.</p>
                                </div>
                            </div>
                            <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors shrink-0 ${twoFactor ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setTwoFactor(!twoFactor)}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>

                        {/* IP Restriction */}
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                            <div className="pr-4 flex items-start gap-3">
                                <ShieldAlert className="text-orange-500 mt-0.5 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Restrict by IP Address</h4>
                                    <p className="text-xs text-gray-500 mt-1">Only allow logins from white-listed office IP addresses.</p>
                                </div>
                            </div>
                            <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors shrink-0 ${ipRestriction ? 'bg-orange-500' : 'bg-gray-300'}`} onClick={() => setIpRestriction(!ipRestriction)}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${ipRestriction ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>

                        {/* Session Timeout */}
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                            <div className="pr-4 flex items-start gap-3">
                                <Clock className="text-gray-500 mt-0.5 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Session Timeout</h4>
                                    <p className="text-xs text-gray-500 mt-1">Automatically log out idle users.</p>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center">
                                <select className="h-9 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>15 Minutes</option>
                                    <option>30 Minutes</option>
                                    <option>1 Hour</option>
                                    <option>24 Hours</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Active Sessions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Active Sessions</h3>
                        <p className="text-xs text-gray-500 pr-4">Review devices currently logged into your account.</p>
                    </div>
                    <div className="md:col-span-2">
                        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">

                            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-emerald-50/50">
                                <div className="flex items-center gap-3">
                                    <Laptop size={18} className="text-emerald-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-emerald-900">Mac OS • Chrome</p>
                                        <p className="text-xs text-emerald-700">Bangalore, India • Current Session</p>
                                    </div>
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Active</span>
                            </div>

                            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <Smartphone size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">iOS 16 • Safari</p>
                                        <p className="text-xs text-gray-500">Mumbai, India • Last active 2h ago</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Revoke
                                </Button>
                            </div>

                        </div>
                        <Button variant="outline" className="w-full mt-4 text-gray-600 border-gray-200 h-10 hover:bg-gray-50">
                            <LogOut size={16} className="mr-2" /> Sign Out All Other Devices
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

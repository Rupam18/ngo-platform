"use client";

import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Save, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function OrgProfileSettings() {
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
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Organization Profile</h2>
                    <p className="text-sm text-gray-500 mt-1">Public-facing details for your NGO platform.</p>
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
                {/* Visual Identity */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Visual Identity</h3>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">NGO Logo</label>
                            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                                <ImageIcon size={24} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                                <span className="text-xs text-gray-500 font-medium">Upload</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Banner</label>
                            <div className="w-full h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                                <UploadCloud size={24} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                                <span className="text-xs text-gray-500 font-medium">Drag and drop banner image</span>
                                <span className="text-[10px] text-gray-400">1200 x 400px recommended</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* About Content */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">About Content</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Tagline)</label>
                        <Input defaultValue="Empowering local communities through education and relief." className="border-gray-200" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                        <textarea
                            className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Describe your primary mission and goals..."
                            defaultValue="To create sustainable long-term solutions for underprivileged youth by providing necessary academic infrastructure and emergency crisis relief across underdeveloped regions."
                        />
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Registration Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Registration & Tax IDs</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Trust/Society Registration No.</label>
                            <Input defaultValue="E/12345/MH" className="border-gray-200 font-mono text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                            <Input defaultValue="AAAAG1234H" className="border-gray-200 font-mono text-sm" />
                        </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-emerald-900 text-sm">80G Certificate</h4>
                            <p className="text-xs text-emerald-700 mt-0.5">Allow donors to claim Indian tax exemptions.</p>
                        </div>
                        <Button variant="outline" className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                            Upload Document
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

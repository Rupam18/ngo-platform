"use client";

import { useState } from "react";
import { Save, CheckCircle2, Palette, LayoutTemplate, Moon, Sun, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppearanceSettings() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const [activeColor, setActiveColor] = useState("emerald");
    const [activeTheme, setActiveTheme] = useState("light");
    const [activeSidebar, setActiveSidebar] = useState("expanded");

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 800);
    };

    const colors = [
        { id: "emerald", label: "Emerald (Default)", code: "bg-emerald-500", ring: "ring-emerald-500" },
        { id: "blue", label: "Ocean Blue", code: "bg-blue-600", ring: "ring-blue-600" },
        { id: "indigo", label: "Deep Indigo", code: "bg-indigo-600", ring: "ring-indigo-600" },
        { id: "rose", label: "Rose Red", code: "bg-rose-500", ring: "ring-rose-500" },
        { id: "amber", label: "Warm Amber", code: "bg-amber-500", ring: "ring-amber-500" },
    ];

    return (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        Appearance <Palette size={18} className="text-pink-500" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Customize the look and feel of your admin dashboard.</p>
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

                {/* Theme Mode */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Color Mode</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => setActiveTheme("light")}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${activeTheme === "light" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                        >
                            <Sun size={24} className={activeTheme === "light" ? "text-gray-900" : "text-gray-500"} />
                            <span className={`text-sm font-medium ${activeTheme === "light" ? "text-gray-900" : "text-gray-500"}`}>Light</span>
                        </button>
                        <button
                            onClick={() => setActiveTheme("dark")}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${activeTheme === "dark" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                        >
                            <Moon size={24} className={activeTheme === "dark" ? "text-gray-900" : "text-gray-500"} />
                            <span className={`text-sm font-medium ${activeTheme === "dark" ? "text-gray-900" : "text-gray-500"}`}>Dark</span>
                        </button>
                        <button
                            onClick={() => setActiveTheme("system")}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${activeTheme === "system" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                        >
                            <LayoutTemplate size={24} className={activeTheme === "system" ? "text-gray-900" : "text-gray-500"} />
                            <span className={`text-sm font-medium ${activeTheme === "system" ? "text-gray-900" : "text-gray-500"}`}>System</span>
                        </button>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Primary Colors */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Primary Brand Color</h3>
                    <div className="flex flex-wrap gap-4">
                        {colors.map(color => (
                            <button
                                key={color.id}
                                onClick={() => setActiveColor(color.id)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${activeColor === color.id
                                        ? `border-transparent ring-2 ring-offset-2 ${color.ring} bg-white shadow-sm`
                                        : "border-gray-200 bg-white hover:bg-gray-50"
                                    }`}
                            >
                                <span className={`w-4 h-4 rounded-full ${color.code} shadow-inner`} />
                                <span className="text-sm font-medium text-gray-700">{color.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Sidebar Density */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Sidebar Density</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setActiveSidebar("expanded")}
                            className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${activeSidebar === "expanded" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                        >
                            <div className="flex items-center gap-3">
                                <LayoutDashboard size={20} className={activeSidebar === "expanded" ? "text-gray-900" : "text-gray-500"} />
                                <div className="text-left">
                                    <p className={`text-sm font-bold ${activeSidebar === "expanded" ? "text-gray-900" : "text-gray-700"}`}>Expanded</p>
                                    <p className="text-xs text-gray-500">Labels and icons always visible</p>
                                </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${activeSidebar === "expanded" ? "border-gray-900 bg-gray-900" : "border-gray-300 bg-white"}`} />
                        </button>
                        <button
                            onClick={() => setActiveSidebar("compact")}
                            className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${activeSidebar === "compact" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                        >
                            <div className="flex items-center gap-3">
                                <LayoutDashboard size={20} className={activeSidebar === "compact" ? "text-gray-900" : "text-gray-500"} />
                                <div className="text-left">
                                    <p className={`text-sm font-bold ${activeSidebar === "compact" ? "text-gray-900" : "text-gray-700"}`}>Compact</p>
                                    <p className="text-xs text-gray-500">Icons only, saves screen real estate</p>
                                </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${activeSidebar === "compact" ? "border-gray-900 bg-gray-900" : "border-gray-300 bg-white"}`} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Save, CheckCircle2, Shield, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RolesPermissions() {
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

    const roles = [
        { id: "superadmin", name: "Super Admin", description: "Unrestricted access to all modules and billing." },
        { id: "admin", name: "Admin", description: "Can manage campaigns, donors, but not system settings." },
        { id: "finance", name: "Finance Manager", description: "Read-only access to campaigns; full access to donations & reports." },
        { id: "content", name: "Content Manager", description: "Can create and edit campaigns, but cannot delete or refund." },
        { id: "volunteer", name: "Volunteer", description: "Limited read-only access to assigned active campaigns." },
    ];

    const permissions = [
        "View Donations", "Refund Donations", "Export Financials",
        "Create Campaigns", "Publish Campaigns", "Delete Campaigns",
        "View Donors", "Edit Donors", "Export Donors",
        "Manage Settings", "Manage Users"
    ];

    return (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        Roles & Permissions <Shield size={18} className="text-indigo-500" />
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Control access levels and define capabilities for dashboard users.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-gray-200 text-gray-700 bg-white">
                        <UserPlus size={16} className="mr-2 text-gray-400" /> New Role
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

            <div className="space-y-8 max-w-[1000px]">

                {/* Visual Roles Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {roles.map((role, idx) => (
                        <div key={role.id} className="p-4 rounded-xl border border-gray-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer group">
                            <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">{role.name}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2">{role.description}</p>
                            <div className="mt-3 flex -space-x-2">
                                {[...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gray-100 border border-white flex items-center justify-center">
                                        <Users size={10} className="text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="border-gray-100" />

                {/* Detailed Matrix */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Permission Matrix</h3>

                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50/80 text-gray-600">
                                <tr>
                                    <th className="px-4 py-3 font-semibold border-b border-gray-100 min-w-[200px]">Capability</th>
                                    {roles.map(r => (
                                        <th key={r.id} className="px-4 py-3 font-semibold border-b border-gray-100 text-center text-xs whitespace-nowrap">
                                            {r.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map((perm, idx) => (
                                    <tr key={perm} className={`hover:bg-gray-50 border-b border-gray-50 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                        <td className="px-4 py-3 font-medium text-gray-800">{perm}</td>
                                        {roles.map(r => {
                                            // Mock logic simply to visually populate the table differently
                                            const isSuperAdmin = r.id === "superadmin";
                                            const isChecked = isSuperAdmin || Math.random() > 0.4;

                                            return (
                                                <td key={`${r.id}-${perm}`} className="px-4 py-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={isChecked}
                                                        disabled={isSuperAdmin}
                                                        className={`w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${isSuperAdmin ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Campaign {
    id: string;
    title: string;
    raisedAmount: number;
    goalAmount: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
            return;
        }

        fetchCampaigns();
    }, [router]);

    async function fetchCampaigns() {
        try {
            const res = await fetch("/api/campaigns");
            if (res.ok) {
                const data = await res.json();
                setCampaigns(data);
            }
        } catch (error) {
            console.error("Failed to fetch campaigns", error);
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/auth/login");
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this campaign?")) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/campaigns/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setCampaigns(campaigns.filter((c) => c.id !== id));
            } else {
                alert("Failed to delete campaign");
            }
        } catch (error) {
            alert("Error deleting campaign");
        }
    }

    const totalRaised = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);

    if (loading) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Link href="/">
                            <Button variant="outline">View Site</Button>
                        </Link>
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-500">Total Campaigns</h3>
                        <p className="text-3xl font-bold mt-2">{campaigns.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-500">Total Raised</h3>
                        <p className="text-3xl font-bold mt-2 text-green-600">
                            ₹{totalRaised.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                {/* Campaigns List */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Campaigns</h2>
                        <Link href="/dashboard/create-campaign">
                            <Button>+ Create Campaign</Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">Title</th>
                                    <th className="px-6 py-3">Raised</th>
                                    <th className="px-6 py-3">Goal</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {campaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{campaign.title}</td>
                                        <td className="px-6 py-4 text-green-600">
                                            ₹{campaign.raisedAmount.toLocaleString("en-IN")}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            ₹{campaign.goalAmount.toLocaleString("en-IN")}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link href={`/dashboard/edit-campaign/${campaign.id}`}>
                                                <Button variant="outline">Edit</Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDelete(campaign.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {campaigns.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            No campaigns found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

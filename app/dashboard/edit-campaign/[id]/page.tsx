"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import CampaignForm from "@/components/admin/CampaignForm";

export default function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const resolvedParams = use(params);

    useEffect(() => {
        fetchCampaign(resolvedParams.id);
    }, [resolvedParams.id]);

    async function fetchCampaign(id: string) {
        try {
            const res = await fetch(`/api/campaigns/${id}`);
            if (res.ok) {
                const data = await res.json();
                setCampaign(data);
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            router.push("/dashboard");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="p-8 text-center">Loading campaign details...</div>;
    }

    if (!campaign) {
        return <div className="p-8 text-center text-red-500">Campaign not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <CampaignForm initialData={campaign} />
            </div>
        </div>
    );
}

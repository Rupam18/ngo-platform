"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchWithAuth } from "@/lib/api";

interface CampaignFormProps {
    initialData?: any;
}

export default function CampaignForm({ initialData }: CampaignFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        goal: initialData?.goal || "",
        category: initialData?.category || "EDUCATION",
        image: initialData?.image || "",
    });

    const isEditing = !!initialData;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const url = isEditing
                ? `/campaign/${initialData.id}`
                : "/campaign";
            const method = isEditing ? "PUT" : "POST";

            // Target backend requires goal as a number
            const payload = {
                ...formData,
                goal: Number(formData.goal)
            };

            await fetchWithAuth(url, {
                method,
                body: JSON.stringify(payload),
            });

            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit Campaign" : "Create New Campaign"}
            </h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Campaign Title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Target Amount (₹)</label>
                    <Input
                        type="number"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        required
                        placeholder="50000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="EDUCATION">Education</option>
                        <option value="MEDICAL">Medical</option>
                        <option value="EMERGENCY">Emergency</option>
                        <option value="ENVIRONMENT">Environment</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <Input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        required
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        placeholder="Detailed description of the campaign..."
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : isEditing ? "Update Campaign" : "Create Campaign"}
                </Button>
            </div>
        </form>
    );
}

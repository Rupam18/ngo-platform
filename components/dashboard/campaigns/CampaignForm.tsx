"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, CalendarIcon, FileImage, Type, Tag, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CampaignForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form fields
    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");

    const totalSteps = 3;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handlePublish = async () => {
        setLoading(true);
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
            const formData = new FormData();
            formData.append("title", title);
            formData.append("goal", goal);
            if (description) formData.append("description", description);
            if (imageFile) formData.append("image", imageFile);

            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const res = await fetch(`${baseUrl}/campaign`, {
                method: "POST",
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
            } else {
                alert("Creation failed: " + data.message);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center max-w-2xl mx-auto"
            >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Published!</h2>
                <p className="text-gray-500 mb-8 max-w-md">Your new fundraising campaign is now live on the platform. Donors can start contributing immediately.</p>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => { setSuccess(false); setStep(1); }} className="px-6 rounded-lg border-gray-200">
                        Create Another
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-lg">
                        View Live Page
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6 max-w-4xl">
            {/* Step Progress Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Campaign Details Setup</h3>
                    <p className="text-sm text-gray-500">Step {step} of {totalSteps}</p>
                </div>
                <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-2.5 w-12 rounded-full transition-colors duration-300 ${step >= i ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                    ))}
                </div>
            </div>

            <div className="p-8">
                <AnimatePresence mode="wait">
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-gray-900 font-semibold mb-4 text-xl flex items-center">
                                <Type className="mr-2 text-blue-500" size={20} /> Basic Information
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
                                    <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Save the Rainforest 2026" className="h-11 border-gray-200 focus:ring-blue-500" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Tag size={14} /> Category</label>
                                        <select className="w-full h-11 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white">
                                            <option>Education</option>
                                            <option>Healthcare</option>
                                            <option>Emergency Relief</option>
                                            <option>Environment</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><IndianRupee size={14} /> Goal Amount (₹)</label>
                                        <Input type="number" value={goal} onChange={e => setGoal(e.target.value)} placeholder="500000" className="h-11 border-gray-200 focus:ring-blue-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><CalendarIcon size={14} /> Start Date</label>
                                        <Input type="date" className="h-11 border-gray-200 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><CalendarIcon size={14} /> End Date</label>
                                        <Input type="date" className="h-11 border-gray-200 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Media & Content */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-gray-900 font-semibold mb-4 text-xl flex items-center">
                                <FileImage className="mr-2 text-emerald-500" size={20} /> Media & Story
                            </h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Cover Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:bg-gray-50 hover:border-blue-300 transition-colors cursor-pointer group flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={e => setImageFile(e.target.files?.[0] || null)}
                                    />
                                    <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <UploadCloud size={24} />
                                    </div>
                                    <p className="font-medium text-gray-900 mb-1">
                                        {imageFile ? imageFile.name : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Story / Description</label>
                                {/* Simulating Rich Text Editor */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                    <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
                                        <button className="h-8 w-8 hover:bg-white rounded shadow-sm text-gray-600 font-bold border border-transparent hover:border-gray-200 transition-colors">B</button>
                                        <button className="h-8 w-8 hover:bg-white rounded shadow-sm text-gray-600 italic border border-transparent hover:border-gray-200 transition-colors">I</button>
                                        <button className="h-8 w-8 hover:bg-white rounded shadow-sm text-gray-600 underline border border-transparent hover:border-gray-200 transition-colors">U</button>
                                        <div className="w-[1px] h-6 bg-gray-300 mx-1 self-center" />
                                        <button className="h-8 px-2 hover:bg-white rounded shadow-sm text-gray-600 border border-transparent hover:border-gray-200 transition-colors text-xs font-medium">H1</button>
                                        <button className="h-8 px-2 hover:bg-white rounded shadow-sm text-gray-600 border border-transparent hover:border-gray-200 transition-colors text-xs font-medium">H2</button>
                                    </div>
                                    <textarea
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className="w-full h-48 p-4 focus:outline-none resize-none text-gray-700"
                                        placeholder="Write an inspiring story explaining what this campaign solves..."
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Review & Publish */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-gray-900 font-semibold mb-6 text-xl flex items-center">
                                <CheckCircle2 className="mr-2 text-blue-500" size={20} /> Review & Confirmation
                            </h4>

                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
                                <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg shrink-0 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')" }}>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Education</p>
                                        <h2 className="text-2xl font-bold text-gray-900">{title || "Education for All 2026"}</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Goal Amount</p>
                                            <p className="font-semibold text-gray-900">₹5,00,000</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Duration</p>
                                            <p className="font-semibold text-gray-900">01 Mar - 30 Jun</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 text-center pt-4">By publishing, this campaign will immediately become active and public on the main website.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Form Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-b-2xl">
                {step > 1 ? (
                    <Button variant="outline" onClick={handlePrev} className="border-gray-200">
                        <ChevronLeft size={16} className="mr-2" /> Back
                    </Button>
                ) : <div />}

                <div className="flex gap-3">
                    <Button variant="ghost" className="text-gray-500 hover:bg-gray-200">Save as Draft</Button>
                    {step < totalSteps ? (
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm px-6" onClick={handleNext}>
                            Continue <ChevronRight size={16} className="ml-2" />
                        </Button>
                    ) : (
                        <Button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm px-8"
                            onClick={handlePublish}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Publishing...
                                </span>
                            ) : "Publish Campaign"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

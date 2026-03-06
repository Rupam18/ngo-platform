"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import StickyHeader from "@/components/home/StickyHeader"
import Footer from "@/components/home/Footer"
import { toast } from "sonner"

const inKindSchema = z.object({
    firstName: z.string().min(2, "First name is required").regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),
    lastName: z.string().regex(/^[A-Za-z\s]*$/, "Only letters are allowed").optional(),
    email: z.string().email("Enter valid email"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian number"),
    address: z.string().min(10, "Pickup address is required"),
    subject: z.string().min(1, "Please select donation purpose"),
    clothes: z.coerce.number().min(0).optional().default(0),
    books: z.coerce.number().min(0).optional().default(0),
    raddi: z.coerce.number().min(0).optional().default(0),
    grains: z.coerce.number().min(0).optional().default(0),
    stationery: z.coerce.number().min(0).optional().default(0),
    computers: z.coerce.number().min(0).optional().default(0),
    otherItems: z.string().optional(),
    message: z.string().optional(),
}).refine((data) => {
    return (
        data.clothes > 0 ||
        data.books > 0 ||
        data.raddi > 0 ||
        data.grains > 0 ||
        data.stationery > 0 ||
        data.computers > 0 ||
        (data.otherItems && data.otherItems.trim().length > 0)
    );
}, {
    message: "Please add at least one donation item",
    path: ["clothes"]
});

type InKindFormData = z.infer<typeof inKindSchema>;

export default function InKindDonation() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<InKindFormData>({
        resolver: zodResolver(inKindSchema) as any, // Cast to any to bypass strict resolver generic mismatch
        mode: "onChange",
        defaultValues: {
            clothes: "" as any,
            books: "" as any,
            raddi: "" as any,
            grains: "" as any,
            stationery: "" as any,
            computers: "" as any,
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: InKindFormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/inkind-donation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                toast.success("In-kind donation request submitted successfully!");
                // Optionally reset the form
                // reset();
            } else {
                toast.error(result.error || "Failed to submit request.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* Main Content Area matching Donate Page Spacing */}
            {/* Main Content Area */}
            <section className="flex-grow max-w-5xl mx-auto px-6 py-10 mt-8 w-full mb-16 space-y-12">

                {/* 🔵 SUPPORT CARD - NOW AT TOP */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden group"
                >
                    {/* Subtle decorative background blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 group-hover:bg-blue-100 transition-colors duration-700" />

                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">
                        Support Through <span className="text-blue-600">In-Kind Donation</span>
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl font-medium">
                        Your non-monetary contributions such as clothes, books, grains,
                        computers and educational supplies directly support children
                        and communities in need.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">

                        <motion.div whileHover={{ y: -5 }} className="flex items-start gap-4">
                            <div className="bg-blue-100 p-4 rounded-2xl text-2xl shadow-sm border border-blue-50">👕</div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Clothes & Essentials</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    Support families with basic necessities.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="flex items-start gap-4">
                            <div className="bg-yellow-100 p-4 rounded-2xl text-2xl shadow-sm border border-yellow-50">📚</div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Books & Stationery</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    Help children continue their education.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="flex items-start gap-4">
                            <div className="bg-purple-100 p-4 rounded-2xl text-2xl shadow-sm border border-purple-50">💻</div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Computers & Devices</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    Bridge the digital divide.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>

                {/* 🟣 FORM CARD - NOW BELOW SUPPORT CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-1.5 rounded-[32px] shadow-2xl relative group"
                >
                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-[32px] blur-xl opacity-20 group-hover:opacity-60 transition duration-700 pointer-events-none" />

                    <div className="bg-white rounded-[28px] p-8 md:p-12 relative z-10">

                        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 border-b border-gray-100 pb-6">
                            Donation <span className="text-blue-600">In-Kind Form</span>
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Section 1: Donor Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        {...register("firstName")}
                                        placeholder="First Name"
                                        className={`premium-input font-medium w-full ${errors.firstName ? "border-red-500" : ""}`}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                                </div>
                                <div>
                                    <input
                                        {...register("lastName")}
                                        placeholder="Last Name (Optional)"
                                        className={`premium-input font-medium w-full ${errors.lastName ? "border-red-500" : ""}`}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="Email Address"
                                        className={`premium-input font-medium w-full ${errors.email ? "border-red-500" : ""}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        {...register("phone")}
                                        placeholder="Phone Number"
                                        className={`premium-input font-medium w-full ${errors.phone ? "border-red-500" : ""}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <textarea
                                        {...register("address")}
                                        placeholder="Detailed Pickup Address"
                                        rows={3}
                                        className={`premium-input font-medium resize-none w-full ${errors.address ? "border-red-500" : ""}`}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <select
                                        {...register("subject")}
                                        className={`premium-input font-medium w-full ${errors.subject ? "border-red-500" : ""}`}
                                    >
                                        <option value="">Select Donation Purpose</option>
                                        <option value="education">Child Education Support</option>
                                        <option value="health">Healthcare Assistance</option>
                                        <option value="community">Community Welfare</option>
                                        <option value="digital">Digital Empowerment</option>
                                        <option value="general">General NGO Support</option>
                                    </select>
                                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                                </div>
                            </div>

                            {/* Section 2: Items */}
                            <h3 className="text-xl font-bold text-gray-800 mt-10 mb-6">
                                Items for Donation
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                                <input type="number" min={0} step="1" {...register("clothes")} placeholder="Clothes (Kg)" className="premium-input font-medium" />
                                <input type="number" min={0} step="1" {...register("books")} placeholder="Books (Units)" className="premium-input font-medium" />
                                <input type="number" min={0} step="1" {...register("raddi")} placeholder="Raddi (Kg)" className="premium-input font-medium" />
                                <input type="number" min={0} step="1" {...register("grains")} placeholder="Grains (Kg)" className="premium-input font-medium" />
                                <input type="number" min={0} step="1" {...register("stationery")} placeholder="Stationery (Units)" className="premium-input font-medium" />
                                <input type="number" min={0} step="1" {...register("computers")} placeholder="Computers (Units)" className="premium-input font-medium" />
                            </div>

                            <textarea
                                {...register("otherItems")}
                                placeholder="Other Items not listed above (Optional)..."
                                rows={2}
                                className="premium-input mt-4 font-medium resize-none w-full"
                            />

                            {errors.clothes && (
                                <p className="text-red-500 text-sm mt-2">{errors.clothes.message}</p>
                            )}

                            <textarea
                                {...register("message")}
                                placeholder="Message or Special Instructions (Optional)"
                                rows={3}
                                className="premium-input mt-4 font-medium resize-none w-full"
                            />

                            <div className="pt-8 w-full">
                                <motion.div whileHover={isValid ? { scale: 1.02 } : {}} whileTap={isValid ? { scale: 0.98 } : {}}>
                                    <Button
                                        type="submit"
                                        disabled={!isValid}
                                        variant="primary"
                                        size="lg"
                                        className={`w-full py-5 rounded-2xl text-lg flex items-center justify-center relative overflow-hidden transition-all ${!isValid ? "opacity-50 cursor-not-allowed group" : "group/btn"
                                            }`}
                                    >
                                        <span className={`absolute inset-0 bg-white/10 translate-x-[-100%] transition-transform duration-700 ${!isValid ? "" : "group-hover/btn:translate-x-[100%]"}`}></span>
                                        Submit Donation Request
                                    </Button>
                                </motion.div>
                            </div>

                        </form>

                    </div>
                </motion.div>

            </section>

            <Footer />
        </main>
    )
}

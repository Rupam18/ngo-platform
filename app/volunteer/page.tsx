"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import StickyHeader from "@/components/home/StickyHeader"
import Footer from "@/components/home/Footer"
import { Button } from "@/components/ui/button"

const volunteerSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    dob: z.string().refine((date) => {
        if (!date) return false;
        const age = new Date().getFullYear() - new Date(date).getFullYear()
        return age >= 16
    }, "You must be at least 16 years old"),

    gender: z.string().min(1, "Please select gender"),

    nationality: z
        .string()
        .min(2, "Nationality is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    address: z.string().min(10, "Permanent address required"),

    city: z
        .string()
        .min(2, "City is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    state: z
        .string()
        .min(2, "State is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    country: z
        .string()
        .min(2, "Country is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    pincode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit PIN"),

    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit number"),

    email: z.string().email("Enter valid email"),
})

type VolunteerFormData = z.infer<typeof volunteerSchema>

export default function VolunteerPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<VolunteerFormData>({
        resolver: zodResolver(volunteerSchema),
        mode: "onChange",
    })

    const onSubmit = (data: VolunteerFormData) => {
        console.log("Volunteer Application:", data)
        // 🔥 Send to backend / DB
    }
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 via-yellow-50 to-purple-100">
            <StickyHeader />

            <section className="flex-grow pt-12 pb-16 px-4 md:px-6">
                <div className="max-w-6xl mx-auto space-y-10">

                    {/* 🔵 Volunteer Stats - Horizontal */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 md:p-8 shadow-md border border-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
                            <div>
                                <h3 className="text-4xl font-extrabold text-blue-700">1000+</h3>
                                <p className="text-gray-600 font-medium mt-2">Active Volunteers</p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-extrabold text-yellow-600">10+</h3>
                                <p className="text-gray-600 font-medium mt-2">Active Projects</p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-extrabold text-purple-600">500+</h3>
                                <p className="text-gray-600 font-medium mt-2">Children Helped</p>
                            </div>
                        </div>
                    </div>

                    {/* 🟣 Volunteer Form */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-2xl border border-white/50">

                        <h2 className="text-4xl font-bold text-blue-900 mb-2">
                            Become a Volunteer
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Join our mission to support children, education & healthcare.
                        </p>

                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                            {/* PERSONAL INFO */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Personal Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            {...register("fullName")}
                                            placeholder="Full Name"
                                            className={`premium-input w-full ${errors.fullName ? "border-red-500" : ""}`}
                                        />
                                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            type="date"
                                            {...register("dob")}
                                            className={`premium-input w-full ${errors.dob ? "border-red-500" : ""}`}
                                            aria-label="Date of Birth"
                                        />
                                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
                                    </div>

                                    <div>
                                        <select {...register("gender")} className={`premium-input w-full ${errors.gender ? "border-red-500" : ""}`}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            {...register("nationality")}
                                            placeholder="Nationality"
                                            className={`premium-input w-full ${errors.nationality ? "border-red-500" : ""}`}
                                        />
                                        {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* CONTACT INFO */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Contact Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <textarea
                                            {...register("address")}
                                            placeholder="Permanent Address"
                                            rows={2}
                                            className={`premium-input w-full resize-none ${errors.address ? "border-red-500" : ""}`}
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            {...register("city")}
                                            placeholder="City"
                                            className={`premium-input w-full ${errors.city ? "border-red-500" : ""}`}
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            {...register("state")}
                                            placeholder="State"
                                            className={`premium-input w-full ${errors.state ? "border-red-500" : ""}`}
                                        />
                                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            {...register("country")}
                                            placeholder="Country"
                                            className={`premium-input w-full ${errors.country ? "border-red-500" : ""}`}
                                        />
                                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            {...register("pincode")}
                                            placeholder="Pin Code"
                                            className={`premium-input w-full ${errors.pincode ? "border-red-500" : ""}`}
                                        />
                                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            type="tel"
                                            {...register("phone")}
                                            placeholder="Phone Number"
                                            className={`premium-input w-full ${errors.phone ? "border-red-500" : ""}`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder="Email Address"
                                            className={`premium-input w-full ${errors.email ? "border-red-500" : ""}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <Button
                                type="submit"
                                disabled={!isValid}
                                className={`w-full py-6 rounded-2xl text-white font-bold text-lg transition-all shadow-lg ${!isValid
                                    ? "bg-gray-400 cursor-not-allowed opacity-50"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-xl"
                                    }`}
                            >
                                Submit Application
                            </Button>

                        </form>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

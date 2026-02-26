"use client"

import StickyHeader from "@/components/home/StickyHeader"
import Footer from "@/components/home/Footer"

export default function VolunteerPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 via-yellow-50 to-purple-100">
            <StickyHeader />

            <section className="flex-grow py-20 px-6 mt-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

                    {/* LEFT SIDE - IMPACT CARD */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">

                        <h3 className="text-2xl font-semibold text-blue-900 mb-6">
                            Why Volunteer With Us?
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-3xl font-bold text-blue-700">1000+</h4>
                                <p className="text-gray-600">Active Volunteers</p>
                            </div>

                            <div>
                                <h4 className="text-3xl font-bold text-yellow-600">10+</h4>
                                <p className="text-gray-600">Active Projects</p>
                            </div>

                            <div>
                                <h4 className="text-3xl font-bold text-purple-600">500+</h4>
                                <p className="text-gray-600">Children Helped</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - FORM */}
                    <div className="md:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50">

                        <h2 className="text-4xl font-bold text-blue-900 mb-2">
                            Become a Volunteer
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Join our mission to support children, education & healthcare.
                        </p>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                            {/* PERSONAL INFO */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Personal Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="premium-input"
                                    />

                                    <input
                                        type="date"
                                        className="premium-input"
                                        aria-label="Date of Birth"
                                    />

                                    <select className="premium-input">
                                        <option>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="Nationality"
                                        className="premium-input"
                                    />
                                </div>
                            </div>

                            {/* CONTACT INFO */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Contact Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Permanent Address"
                                        className="premium-input md:col-span-2"
                                    />

                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="premium-input"
                                    />

                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="premium-input"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Country"
                                        className="premium-input"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Pin Code"
                                        className="premium-input"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="premium-input"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="premium-input"
                                    />
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition duration-300"
                            >
                                Submit Application
                            </button>

                        </form>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

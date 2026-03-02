"use client";

import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Send, User, MessageSquare, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .regex(/^[A-Za-z\s]+$/, "Please enter only letters and spaces"),
    email: z
        .string()
        .email("Please enter a valid email address")
        .regex(/^[a-zA-Z0-9._%+\-]+@gmail\.com$/, "Please enter a valid @gmail.com email address"),
    mobile: z
        .string()
        .regex(/^[0-9]+$/, "Please enter a valid mobile number (digits only)")
        .min(10, "Mobile number must be at least 10 digits")
        .max(15, "Mobile number too long"),
    subject: z
        .string()
        .min(5, "Subject must be at least 5 characters")
        .regex(/^[A-Za-z\s]+$/, "Please enter only letters and spaces"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            email: "",
            mobile: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        console.log("Form Submitted Data:", data);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call network delay
        alert("Message sent successfully! We will get back to you soon.");
        reset();
    };

    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />

            {/* 1. HERO SECTION (Aligned with Programs Page) */}
            <section className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
                <Image
                    src="/headerbanner-riso.jpg" // Matched to Programs Page
                    alt="Contact Us Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 md:bg-black/60 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest uppercase drop-shadow-lg mb-4 mt-8 md:mt-0">
                            Contact Us
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-md hidden md:block">
                            We’d love to hear from you and collaborate for social impact.
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mx-auto mt-4 shadow-lg shadow-black/50" />
                    </motion.div>
                </div>
            </section>

            {/* 2. CONTACT INFO + FORM SECTION */}
            <section className="relative -mt-10 md:-mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-20">
                <div className="grid lg:grid-cols-5 gap-8 bg-white/40 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none rounded-3xl p-2 md:p-0">

                    {/* LEFT COLUMN: Contact Info (Glassmorphism Style) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group"
                    >
                        {/* Decorative background circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none transition-transform duration-700 group-hover:scale-150" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/20 rounded-full blur-[50px] -ml-10 -mb-10 pointer-events-none transition-transform duration-700 group-hover:scale-150" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-2">Get In Touch</h3>
                            <p className="text-blue-200 mb-10 text-sm md:text-base leading-relaxed">
                                Whether you have a question, want to volunteer, or are looking to partner with us, our team is ready to respond.
                            </p>

                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex items-start gap-4 group/item cursor-default">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover/item:shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                                        <MapPin className="text-blue-200 group-hover/item:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-1">Head Office</h4>
                                        <p className="text-blue-100 text-sm leading-relaxed">
                                            RISO Office No 1, 1st Floor,<br />
                                            Chandrashila Complex, Shivane,<br />
                                            Pune 411023
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4 group/item cursor-default">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover/item:shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                                        <Phone className="text-blue-200 group-hover/item:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-1">Phone</h4>
                                        <p className="text-blue-100 text-sm hover:text-white transition-colors">
                                            +91 9730035255
                                        </p>
                                        <p className="text-blue-100 text-sm hover:text-white transition-colors">
                                            +91 9876543210
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4 group/item cursor-default">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-red-500 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover/item:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                                        <Mail className="text-blue-200 group-hover/item:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-1">Email</h4>
                                        <a href="mailto:info@rostrumindia.org" className="text-blue-100 text-sm hover:text-white transition-colors">
                                            info@rostrumindia.org
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Advanced Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-3 bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-blue-900/5 mt-4 lg:mt-0 border border-gray-100"
                    >
                        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-6 drop-shadow-sm">
                            Send us a Message
                        </h3>

                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center justify-center pointer-events-none">
                                            <User className={`transition-colors h-5 w-5 ${errors.fullName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600'}`} />
                                        </div>
                                        <input
                                            type="text"
                                            id="fullName"
                                            className={`block w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all peer ${errors.fullName ? 'border-red-400 focus:ring-red-500/50' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'}`}
                                            placeholder=" "
                                            {...register("fullName")}
                                        />
                                        <label htmlFor="fullName" className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-focus:top-2 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-4 left-10 ${errors.fullName ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'}`}>
                                            Your Full Name
                                        </label>
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.fullName.message}</p>}
                                </div>

                                {/* Email Input */}
                                <div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center justify-center pointer-events-none">
                                            <Mail className={`transition-colors h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600'}`} />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            className={`block w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all peer ${errors.email ? 'border-red-400 focus:ring-red-500/50' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'}`}
                                            placeholder=" "
                                            {...register("email")}
                                        />
                                        <label htmlFor="email" className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-focus:top-2 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-4 left-10 ${errors.email ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'}`}>
                                            Email Address
                                        </label>
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Mobile Input */}
                                <div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center justify-center pointer-events-none">
                                            <Phone className={`transition-colors h-5 w-5 ${errors.mobile ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600'}`} />
                                        </div>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            className={`block w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all peer ${errors.mobile ? 'border-red-400 focus:ring-red-500/50' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'}`}
                                            placeholder=" "
                                            {...register("mobile")}
                                        />
                                        <label htmlFor="mobile" className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-focus:top-2 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-4 left-10 ${errors.mobile ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'}`}>
                                            Mobile Number
                                        </label>
                                    </div>
                                    {errors.mobile && <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.mobile.message}</p>}
                                </div>

                                {/* Subject Input */}
                                <div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center justify-center pointer-events-none">
                                            <Briefcase className={`transition-colors h-5 w-5 ${errors.subject ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600'}`} />
                                        </div>
                                        <input
                                            type="text"
                                            id="subject"
                                            className={`block w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all peer ${errors.subject ? 'border-red-400 focus:ring-red-500/50' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'}`}
                                            placeholder=" "
                                            {...register("subject")}
                                        />
                                        <label htmlFor="subject" className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-focus:top-2 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-4 left-10 ${errors.subject ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'}`}>
                                            Subject
                                        </label>
                                    </div>
                                    {errors.subject && <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.subject.message}</p>}
                                </div>
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <div className="relative group">
                                    <div className="absolute top-4 left-0 pl-4 flex items-start justify-center pointer-events-none">
                                        <MessageSquare className={`transition-colors h-5 w-5 ${errors.message ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600'}`} />
                                    </div>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className={`block w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all peer resize-none ${errors.message ? 'border-red-400 focus:ring-red-500/50' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'}`}
                                        placeholder=" "
                                        {...register("message")}
                                    ></textarea>
                                    <label htmlFor="message" className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-[-16px] peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:top-2 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-4 left-10 ${errors.message ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'}`}>
                                        Your Message...
                                    </label>
                                </div>
                                {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.message.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} className="w-full sm:w-auto text-center sm:text-left">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-8 py-4 text-lg rounded-xl flex items-center justify-center gap-2 group/btn shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            Sending <Loader2 size={18} className="animate-spin ml-2" />
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform ml-2" />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>

                </div>
            </section>

            {/* 3. MAP SECTION */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full flex-grow relative"
            >
                <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.975001306666!2d73.7828004!3d18.4952084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc868b201f9%3A0xe5a3c988ba9663d!2sShivane%2C%20Pune%2C%20Maharashtra%20411023!5e0!3m2!1sen!2sin!4v1715615809712!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        className="absolute inset-0 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] grayscale filter hover:grayscale-0 transition-all duration-700"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </motion.section>

            <Footer />
        </main>
    );
}

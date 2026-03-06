"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password"),
                }),
            });

            const data = await res.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                // Redirect after login
                router.push("/dashboard");
            } else {
                alert(data.error || "Login failed");
                setIsLoading(false);
            }
        } catch (err) {
            alert("An error occurred during login.");
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] px-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-10 border border-white/10 relative z-10"
            >
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-3 rounded-2xl shadow-lg ring-1 ring-black/5">
                        <Image
                            src="/RISO_LOGO_Final2.png"
                            alt="RISO Logo"
                            width={120}
                            height={120}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Admin Portal
                    </h1>
                    <p className="text-sm text-slate-400 mt-2">
                        Enter your credentials for secure access.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                className="h-12 pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="h-12 pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        disabled={isLoading}
                        className="w-full h-12 text-[15px] font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300 disabled:opacity-70 mt-4"
                    >
                        {isLoading ? "Authenticating..." : "Sign In"}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}


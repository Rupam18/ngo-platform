"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Redirect to login page on success
                router.push("/auth/login");
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-6">

            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/40">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Join us and start supporting meaningful causes
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        className="h-12 bg-white text-black placeholder:text-gray-500"
                    />

                    <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        className="h-12 bg-white text-black placeholder:text-gray-500"
                    />

                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="h-12 bg-white text-black placeholder:text-gray-500"
                    />

                    <Button className="w-full h-12 text-lg mt-2">
                        Register
                    </Button>
                </form>

                {/* Footer Link */}
                <p className="text-sm text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

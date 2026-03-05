"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

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
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-6">

            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/40">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    NGO Admin Login
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Secure access to the NGO platform dashboard.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="h-12 bg-white text-black placeholder:text-gray-500"
                    />

                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="h-12 bg-white text-black placeholder:text-gray-500"
                    />

                    <Button className="w-full h-12 text-lg mt-2">
                        Login
                    </Button>
                </form>

                <p className="text-sm text-center mt-6 text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}


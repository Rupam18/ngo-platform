"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
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

                {/* Form */}
                <form className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Full Name"
                        className="h-12 bg-white text-black placeholder:text-gray-500"
                    />

                    <Input
                        type="email"
                        placeholder="Email Address"
                        className="h-12 bg-white text-black placeholder:text-gray-500"
                    />

                    <Input
                        type="password"
                        placeholder="Password"
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

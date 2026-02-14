"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
        }
    }, [router]);

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/auth/login");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">
                Welcome to Dashboard 🎉
            </h1>
            <Button onClick={handleLogout} variant="destructive">
                Logout
            </Button>
        </div>
    );
}

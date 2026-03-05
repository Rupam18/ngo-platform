"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Skip check if we are on the login page (shouldn't happen here, but defensive)
        if (pathname === "/auth/login") {
            setIsAuthorized(true);
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/auth/login");
        } else {
            setIsAuthorized(true);
        }
    }, [pathname, router]);

    // Show a loading spinner to prevent the dashboard flashing before redirect
    if (!isAuthorized) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-[#f8fafc]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="text-sm font-medium text-slate-500">Checking credentials...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

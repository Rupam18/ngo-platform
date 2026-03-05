import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 min-w-0 bg-[#f8fafc]">
                    <Topbar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}

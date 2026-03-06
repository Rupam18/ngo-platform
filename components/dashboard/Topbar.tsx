"use client";

import Link from "next/link";
import { Bell, Search, Globe, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { NotificationBell } from "./NotificationBell";

export function Topbar() {
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/auth/login");
    }

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm flex-shrink-0">
            <div className="flex items-center flex-1">
                <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-full w-full max-w-md border border-gray-100 focus-within:border-emerald-200 focus-within:ring-1 focus-within:ring-emerald-200 transition-all">
                    <Search size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search campaigns, donors, volunteers..."
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-5">
                <Link href="/" target="_blank">
                    <Button variant="ghost" size="sm" className="hidden md:flex text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-full px-4 h-10">
                        <Globe size={16} className="mr-2" />
                        View Site
                    </Button>
                </Link>

                <NotificationBell />

                <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-4 rounded-full transition-colors border border-transparent hover:border-gray-200 focus:outline-none">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                                A
                            </div>
                            <div className="text-sm text-left hidden md:block">
                                <p className="font-semibold text-gray-900 leading-tight">Admin</p>
                                <p className="text-xs text-gray-500">Superadmin</p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl border-gray-100 shadow-lg">
                        <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-100" />
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-lg m-1">
                            <User className="mr-2 h-4 w-4 text-gray-500" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-lg m-1">
                            <Bell className="mr-2 h-4 w-4 text-gray-500" />
                            <span>Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-100" />
                        <DropdownMenuItem
                            className="text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:text-red-700 rounded-lg m-1"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

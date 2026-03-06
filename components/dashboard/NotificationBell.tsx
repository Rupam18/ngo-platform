"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Heart, Mail, UserPlus } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Notification = {
    id: string;
    title: string;
    message: string;
    type: "DONATION" | "CONTACT" | "VOLUNTEER";
    isRead: boolean;
    createdAt: string;
};

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.data);
                setUnreadCount(data.data.filter((n: Notification) => !n.isRead).length);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const markAsRead = async (id: string) => {
        try {
            const res = await fetch(`/api/notifications/${id}`, { method: "PATCH" });
            if (res.ok) {
                setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
                );
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const res = await fetch("/api/notifications", { method: "PATCH" });
            if (res.ok) {
                setNotifications((prev) =>
                    prev.map((n) => ({ ...n, isRead: true }))
                );
                setUnreadCount(0);
            }
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "DONATION":
                return <Heart className="h-4 w-4 text-rose-500" />;
            case "CONTACT":
                return <Mail className="h-4 w-4 text-blue-500" />;
            case "VOLUNTEER":
                return <UserPlus className="h-4 w-4 text-emerald-500" />;
            default:
                return <Bell className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50 focus:outline-none">
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 rounded-xl border-gray-100 shadow-lg mt-2 absolute -right-2 top-2">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white rounded-t-xl">
                    <h4 className="font-semibold text-gray-900">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-auto py-1 px-2"
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>

                <div className="max-h-[300px] overflow-y-auto bg-gray-50/50">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500 py-8">
                            No notifications right now.
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`flex items-start gap-3 p-4 border-b border-gray-100 last:border-0 transition-colors ${notification.isRead ? "bg-white opacity-60" : "bg-emerald-50/30"
                                        }`}
                                >
                                    <div className={`mt-0.5 p-2 rounded-full flex-shrink-0 ${notification.isRead ? "bg-gray-100" : "bg-white shadow-sm border border-gray-100"
                                        }`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${notification.isRead ? "text-gray-700" : "text-gray-900"}`}>
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-medium">
                                            {new Date(notification.createdAt).toLocaleDateString(undefined, {
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </p>
                                    </div>
                                    {!notification.isRead && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="text-gray-400 hover:text-emerald-600 transition-colors p-1"
                                            title="Mark as read"
                                        >
                                            <Check className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

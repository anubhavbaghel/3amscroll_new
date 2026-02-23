"use client";

import { Bell, Check, ExternalLink, Sparkles, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { markNotificationAsRead, markAllAsRead } from "@/app/actions/notifications";
import { toast } from "sonner";

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    link?: string;
    is_read: boolean;
    created_at: string;
}

export default function NotificationsList({
    initialNotifications,
    userId
}: {
    initialNotifications: Notification[],
    userId: string
}) {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleMarkAsRead = async (id: string) => {
        const res = await markNotificationAsRead(id);
        if (res.success) {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } else {
            toast.error("Failed to update notification");
        }
    };

    const handleMarkAllAsRead = async () => {
        const res = await markAllAsRead();
        if (res.success) {
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            toast.success("All caught up!");
        } else {
            toast.error("Failed to update notifications");
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'ai_draft_ready': return <Sparkles className="w-5 h-5 text-indigo-500" />;
            case 'ai_audit_complete': return <FileText className="w-5 h-5 text-emerald-500" />;
            default: return <Bell className="w-5 h-5 text-slate-400" />;
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold font-display">Notifications</h1>
                {notifications.some(n => !n.is_read) && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                        <Check className="w-3 h-3" /> Mark all as read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-800">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bell className="w-8 h-8 text-slate-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No notifications yet</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        When you get followers or AI updates, they'll show up here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`group relative flex gap-4 p-4 rounded-2xl border transition-all duration-300 ${notification.is_read
                                    ? 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-75'
                                    : 'bg-white dark:bg-slate-900 border-primary/20 shadow-lg shadow-primary/5'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notification.is_read ? 'bg-slate-50 dark:bg-slate-800' : 'bg-primary/5'
                                }`}>
                                {getIcon(notification.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className={`text-sm font-bold truncate ${notification.is_read ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                                        {notification.title}
                                    </h3>
                                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                                        {new Date(notification.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                                    {notification.message}
                                </p>

                                <div className="flex items-center gap-3">
                                    {notification.link && (
                                        <Link
                                            href={notification.link}
                                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
                                        >
                                            View Details <ExternalLink className="w-2.5 h-2.5" />
                                        </Link>
                                    )}
                                    {!notification.is_read && (
                                        <button
                                            onClick={() => handleMarkAsRead(notification.id)}
                                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                        >
                                            Mark Read
                                        </button>
                                    )}
                                </div>
                            </div>

                            {!notification.is_read && (
                                <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

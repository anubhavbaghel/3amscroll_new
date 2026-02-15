"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PenSquare, Bell, User as UserIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { User } from "@supabase/supabase-js";

interface BottomNavProps {
    user: User | null;
}

export function BottomNav({ user }: BottomNavProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 lg:hidden safe-area-bottom">
            <div className="flex items-center justify-around h-16">
                <Link
                    href={routes.home}
                    className={`p-3 rounded-xl transition-colors ${isActive(routes.home) ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <Home className="w-6 h-6" strokeWidth={isActive(routes.home) ? 2.5 : 2} />
                    <span className="sr-only">Home</span>
                </Link>

                <Link
                    href={routes.trending} // Exploration/Search tab
                    className={`p-3 rounded-xl transition-colors ${isActive(routes.trending) ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <Search className="w-6 h-6" strokeWidth={isActive(routes.trending) ? 2.5 : 2} />
                    <span className="sr-only">Explore</span>
                </Link>

                <Link
                    href="/write"
                    className="p-3 bg-brand text-white rounded-xl shadow-lg shadow-brand/20 hover:bg-brand-dark transition-colors transform hover:scale-105 active:scale-95"
                >
                    <PenSquare className="w-6 h-6" />
                    <span className="sr-only">Write</span>
                </Link>

                <Link
                    href={user ? "/notifications" : "/login"} // Todo: Notifications route
                    className={`p-3 rounded-xl transition-colors ${isActive("/notifications") ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <Bell className="w-6 h-6" strokeWidth={isActive("/notifications") ? 2.5 : 2} />
                    <span className="sr-only">Activity</span>
                </Link>

                <Link
                    href={user ? routes.profile : "/login"}
                    className={`p-3 rounded-xl transition-colors ${isActive(user ? routes.profile : "/login") ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <UserIcon className="w-6 h-6" strokeWidth={isActive(user ? routes.profile : "/login") ? 2.5 : 2} />
                    <span className="sr-only">Profile</span>
                </Link>
            </div>
        </nav>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bookmark, Bell, User as UserIcon, Users } from "lucide-react";
import { routes } from "@/config/routes";
import { User } from "@supabase/supabase-js";

interface BottomNavProps {
    user: User | null;
    role?: string | null;
}

export function BottomNav({ user, role }: BottomNavProps) {
    const pathname = usePathname();
    const isArticlePage = pathname?.startsWith("/article");

    // Hide BottomNav on article pages to avoid clash with MobileArticleBar
    if (isArticlePage) return null;

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 lg:hidden pb-safe">
            <div className="flex items-center justify-around h-16">
                {/* 1. Home */}
                <Link
                    href={routes.home}
                    className={`p-3 rounded-xl transition-colors ${isActive(routes.home) ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <Home className="w-6 h-6" strokeWidth={isActive(routes.home) ? 2.5 : 2} />
                    <span className="sr-only">Home</span>
                </Link>

                {/* 2. Following */}
                <Link
                    href={user ? "/following" : "/login"}
                    className={`p-3 rounded-xl transition-colors ${isActive("/following") ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <Users className="w-6 h-6" strokeWidth={isActive("/following") ? 2.5 : 2} />
                    <span className="sr-only">Following</span>
                </Link>

                {/* 3. Search (Center) */}
                <Link
                    href={routes.trending} // Acting as Explore/Search tab
                    className={`p-3 rounded-xl transition-colors ${isActive(routes.trending) ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <Search className="w-6 h-6" strokeWidth={isActive(routes.trending) ? 2.5 : 2} />
                    <span className="sr-only">Search</span>
                </Link>

                {/* 4. Bookmark */}
                <Link
                    href={user ? routes.saved : "/login"}
                    className={`p-3 rounded-xl transition-colors ${isActive(routes.saved) ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                >
                    <Bookmark className="w-6 h-6" strokeWidth={isActive(routes.saved) ? 2.5 : 2} />
                    <span className="sr-only">Saved</span>
                </Link>

                {/* 5. Notification / Login */}
                {user?.id ? (
                    <Link
                        href="/profile"
                        className={`p-3 rounded-xl transition-colors ${isActive("/profile") ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                            }`}
                    >
                        <UserIcon className="w-6 h-6" strokeWidth={isActive("/profile") ? 2.5 : 2} />
                        <span className="sr-only">Profile</span>
                    </Link>
                ) : (
                    <Link
                        href={routes.login}
                        className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${isActive(routes.login) ? "text-brand" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                            }`}
                    >
                        <UserIcon className="w-6 h-6" strokeWidth={1.5} />
                        <span className="text-[10px] font-medium">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}

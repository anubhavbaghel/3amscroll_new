"use client";

import { AuthButton } from "@/components/auth/AuthButton";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { Suspense } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { User } from "@supabase/supabase-js";
import { WriteArticleButton } from "@/components/write/WriteArticleButton";
import { CategoryNav } from "./CategoryNav";
import { Bookmark } from "lucide-react";

import { usePathname } from "next/navigation";

interface DesktopHeaderProps {
    user?: User | null;
    role?: string | null;
}

export function DesktopHeader({ user = null, role = null }: DesktopHeaderProps) {
    const pathname = usePathname();
    const isArticlePage = pathname?.startsWith("/article");

    if (isArticlePage) return null;

    return (
        <header className="hidden lg:block sticky top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-border transition-colors">
            {/* Main Header */}
            <div className="relative z-20">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
                        {/* Logo */}
                        <Link href={routes.home} className="shrink-0 font-bold text-3xl tracking-tighter hover:text-brand transition-colors font-logo text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 drop-shadow-sm">
                            3AM SCROLL
                        </Link>

                        {/* Integrated Category Navigation (Replaces previous Home/Trending/Categories links) */}
                        <div className="flex-1 min-w-0 overflow-hidden flex justify-center">
                            <CategoryNav className="w-full max-w-4xl px-2" />
                        </div>

                        {/* Right Actions */}
                        <div className="shrink-0 flex items-center justify-end gap-3">
                            <Suspense fallback={<div className="w-48 xl:w-64 h-10 bg-gray-100 dark:bg-dark-surface rounded-full animate-pulse" />}>
                                <SearchBar className="hidden xl:block w-48 xl:w-64" />
                            </Suspense>

                            {/* Bookmarks Button */}
                            <Link
                                href={user ? routes.saved : "/login"}
                                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-gray-300 transition-colors group"
                                title="Saved Articles"
                            >
                                <Bookmark className="w-5 h-5 group-hover:text-brand transition-colors" />
                            </Link>

                            {/* Write Button - Admin Only */}
                            {role === 'admin' && (
                                <WriteArticleButton
                                    user={user}
                                    className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold transition-colors flex items-center gap-2 text-sm"
                                />
                            )}

                            {/* User Menu */}
                            <AuthButton user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

import { AuthButton } from "@/components/auth/AuthButton";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { Suspense } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { User } from "@supabase/supabase-js";
import { WriteArticleButton } from "@/components/write/WriteArticleButton";

interface DesktopHeaderProps {
    user?: User | null;
}

export function DesktopHeader({ user = null }: DesktopHeaderProps) {
    return (
        <header className="hidden lg:block sticky top-0 z-50 bg-white dark:bg-dark-bg/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-border transition-colors">
            {/* Main Header */}
            <div className="relative z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-3 items-center h-20">
                        {/* Logo */}
                        <Link href={routes.home} className="font-bold text-3xl tracking-tighter hover:text-brand transition-colors font-logo text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 drop-shadow-sm">
                            3AM SCROLL
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center justify-center gap-1">
                            <Link
                                href={routes.home}
                                className="px-5 py-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface font-medium transition-colors text-sm text-gray-700 dark:text-gray-300 hover:text-brand"
                            >
                                Home
                            </Link>
                            <Link
                                href={routes.trending}
                                className="px-5 py-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface font-medium transition-colors text-sm text-gray-700 dark:text-gray-300 hover:text-brand"
                            >
                                Trending
                            </Link>

                            {/* Categories Dropdown */}
                            <div className="relative group">
                                <button className="px-5 py-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface font-medium transition-colors flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-brand">
                                    Categories
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white dark:bg-dark-surface backdrop-blur-xl border border-gray-100 dark:border-dark-border rounded-2xl shadow-2xl shadow-black/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top overflow-hidden z-50">
                                    <div className="p-2">
                                        {siteConfig.categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={routes.category(category.slug)}
                                                className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="flex-1">
                                                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover/item:text-brand dark:group-hover/item:text-brand-glow transition-colors">
                                                        {category.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{category.description}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center justify-end gap-3">
                            {/* Search */}
                            <Suspense fallback={<div className="w-48 xl:w-64 h-10 bg-gray-100 dark:bg-dark-surface rounded-full animate-pulse" />}>
                                <SearchBar className="w-48 xl:w-64" />
                            </Suspense>

                            {/* Write Button */}
                            <WriteArticleButton
                                user={user}
                                className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold transition-colors flex items-center gap-2 text-sm"
                            />

                            {/* User Menu */}
                            <AuthButton user={user} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Pills Bar */}
            <div className="relative z-10 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md border-b border-gray-100 dark:border-dark-border py-3">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-1 -mx-6 px-6 mask-linear-fade">
                        <Link
                            href={routes.home}
                            className="px-4 py-1.5 rounded-full bg-brand text-white text-sm font-semibold whitespace-nowrap shadow-md shadow-brand/20 hover:bg-brand-dark transition-colors flex-shrink-0"
                        >
                            For You
                        </Link>
                        <Link
                            href={routes.trending}
                            className="px-4 py-1.5 rounded-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap hover:border-brand dark:hover:border-brand hover:text-brand transition-all hover:-translate-y-0.5 flex-shrink-0"
                        >
                            Trending
                        </Link>
                        <div className="w-px h-6 bg-gray-200 dark:bg-dark-border mx-1 flex-shrink-0" />
                        {siteConfig.categories.map((category) => (
                            <Link
                                key={category.id}
                                href={routes.category(category.slug)}
                                className="px-4 py-1.5 rounded-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap hover:border-brand dark:hover:border-brand hover:text-brand transition-all hover:-translate-y-0.5 flex-shrink-0"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}


"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { SearchBar } from "@/components/search/SearchBar";

export function DesktopHeader() {
    return (
        <header className="hidden lg:block sticky top-0 z-50 bg-white dark:bg-black shadow-sm">
            {/* Main Header */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-3 items-center h-16">
                        {/* Logo */}
                        <Link href={routes.home} className="font-bold text-2xl tracking-tight hover:text-blue-600 transition-colors">
                            3AM SCROLL
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center justify-center gap-1">
                            <Link
                                href={routes.home}
                                className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 font-medium transition-colors text-sm"
                            >
                                Home
                            </Link>
                            <Link
                                href={routes.trending}
                                className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 font-medium transition-colors text-sm"
                            >
                                Trending
                            </Link>

                            {/* Categories Dropdown */}
                            <div className="relative group">
                                <button className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 font-medium transition-colors flex items-center gap-1.5 text-sm">
                                    Categories
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="p-2">
                                        {siteConfig.categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={routes.category(category.slug)}
                                                className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group/item"
                                            >
                                                <div className="flex-1">
                                                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                                        {category.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{category.description}</div>
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
                            <SearchBar className="w-48 xl:w-64" />

                            {/* User Menu */}
                            <Link
                                href={routes.profile}
                                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                                aria-label="Profile"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Pills Bar */}
            <div className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-2 py-3 min-w-max">
                            <Link
                                href={routes.home}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium whitespace-nowrap hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                For You
                            </Link>
                            <Link
                                href={routes.trending}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Trending
                            </Link>
                            {siteConfig.categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={routes.category(category.slug)}
                                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}


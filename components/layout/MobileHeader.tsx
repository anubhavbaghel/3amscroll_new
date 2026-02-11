"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { SearchBar } from "@/components/search/SearchBar";

export function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-sm">
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
                    {/* Logo */}
                    <Link href={routes.home} className="font-bold text-xl tracking-tight">
                        3AM SCROLL
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search Bar (Expanded) */}
                {isSearchOpen && (
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                        <SearchBar autoFocus />
                    </div>
                )}

                {/* Category Pills (Horizontal Scroll) */}
                <div className="overflow-x-auto scrollbar-hide bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex gap-2 px-4 py-3">
                        <Link
                            href={routes.home}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium whitespace-nowrap shadow-sm"
                        >
                            For You
                        </Link>
                        <Link
                            href={routes.trending}
                            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap"
                        >
                            Trending
                        </Link>
                        {siteConfig.categories.map((category) => (
                            <Link
                                key={category.id}
                                href={routes.category(category.slug)}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                            <span className="font-bold text-xl">Menu</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="p-4">
                            <div className="space-y-1">
                                <Link
                                    href={routes.home}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="font-medium">Home</span>
                                </Link>
                                <Link
                                    href={routes.trending}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="font-medium">Trending</span>
                                </Link>

                                {siteConfig.categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={routes.category(category.slug)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="font-medium">{category.name}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-1">
                                <Link
                                    href={routes.saved}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="font-medium">Saved</span>
                                </Link>
                                <Link
                                    href={routes.profile}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="font-medium">Profile</span>
                                </Link>
                                <Link
                                    href={routes.settings}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="font-medium">Settings</span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

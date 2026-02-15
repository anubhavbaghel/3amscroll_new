"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { Suspense } from "react";
import { SearchBar } from "@/components/search/SearchBar";

import { User } from "@supabase/supabase-js";
import { AuthButton } from "@/components/auth/AuthButton";
import { WriteArticleButton } from "@/components/write/WriteArticleButton";

interface MobileHeaderProps {
    user?: User | null;
}

export function MobileHeader({ user = null }: MobileHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-border transition-colors">
                <div className="flex items-center justify-between h-16 px-4">
                    {/* Logo */}
                    <Link href={routes.home} className="font-bold text-2xl tracking-tighter hover:text-brand transition-colors font-logo text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
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

                        {/* Auth Button (Visible on Mobile Header) */}
                        <div className="flex items-center">
                            <AuthButton user={user} />
                        </div>

                        {/* Write Button (Icon Only on Mobile) */}
                        <div className="flex items-center">
                            <WriteArticleButton
                                user={user}
                                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                                showIcon={true}
                            >
                                <span className="sr-only">Write</span>
                            </WriteArticleButton>
                        </div>

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

                {/* ... (Search Bar & Categories remain same) ... */}

                {/* Search Bar (Expanded) */}
                {isSearchOpen && (
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                        <Suspense fallback={<div className="w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />}>
                            <SearchBar autoFocus />
                        </Suspense>
                    </div>
                )}

                {/* Category Pills (Horizontal Scroll) */}
                <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md border-b border-gray-100 dark:border-dark-border">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3 px-4">
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
                        <div className="w-px h-6 bg-gray-200 dark:bg-dark-border mx-1 my-auto flex-shrink-0" />
                        {siteConfig.categories.map((category) => (
                            <Link
                                key={category.id}
                                href={routes.category(category.slug)}
                                className="px-4 py-1.5 rounded-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap hover:border-brand dark:hover:border-brand hover:text-brand transition-all hover:-translate-y-0.5 flex-shrink-0"
                            >
                                {category.name}
                            </Link>
                        ))}
                        {/* Right padding spacer */}
                        <div className="w-2 flex-shrink-0" />
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

                                <WriteArticleButton
                                    user={user}
                                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-brand dark:text-brand-glow text-left"
                                    showIcon={false}
                                >
                                    <span className="font-medium">Write Article</span>
                                </WriteArticleButton>

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

                            {/* Conditional Auth Menu Items */}
                            {user && (
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-1">
                                    <Link
                                        href={routes.saved}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="font-medium">Saved Articles</span>
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
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

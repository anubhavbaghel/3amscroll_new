"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, MoreHorizontal } from "lucide-react";
import { routes } from "@/config/routes";
import { ShareButton } from "@/components/article/ShareButton";
import { AuthButton } from "@/components/auth/AuthButton";
import { User } from "@supabase/supabase-js";

import { BookmarkButton } from "@/components/article/BookmarkButton";

interface ArticleNavbarProps {
    user?: User | null;
    articleId: string;
    articleTitle: string;
    articleSlug: string;
    initialIsBookmarked: boolean;
}

export function ArticleNavbar({
    user = null,
    articleId,
    articleTitle,
    articleSlug,
    initialIsBookmarked,
}: ArticleNavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }

            // Calculate reading progress
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollTotal > 0) {
                const progress = (window.scrollY / scrollTotal) * 100;
                setReadingProgress(progress);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled
            ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-border py-2 h-14"
            : "bg-transparent py-4 h-20"
            }`}>
            {/* Reading Progress Bar */}
            <div
                className="absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-150 ease-out"
                style={{ width: `${readingProgress}%` }}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                {/* Left: Back & Logo */}
                <div className="flex items-center gap-4">
                    <Link
                        href={routes.home}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-600 dark:text-gray-400"
                        aria-label="Back to home"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    <Link
                        href={routes.home}
                        className={`font-bold tracking-tighter transition-all duration-300 font-logo ${scrolled ? "text-xl" : "text-2xl"
                            } text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400`}
                    >
                        3AM SCROLL
                    </Link>

                    {/* Desktop Title */}
                    <div className={`hidden md:block transition-all duration-300 font-medium text-sm text-gray-500 dark:text-gray-400 line-clamp-1 max-w-sm`}>
                        {articleTitle}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Share */}
                    <ShareButton
                        title={articleTitle}
                        url={`https://3amscroll.com/article/${articleSlug}`}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
                    />

                    {/* Bookmark */}
                    <BookmarkButton
                        articleId={articleId}
                        initialIsBookmarked={initialIsBookmarked}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
                    />

                    <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block" />

                    {/* User */}
                    <AuthButton user={user} />
                </div>
            </div>
        </nav>
    );
}

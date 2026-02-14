"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";

import { BookmarkButton } from "@/components/article/BookmarkButton";
import { LikeButton } from "@/components/article/LikeButton";

interface ArticleCardDesktopProps {
    article: Article;
    priority?: boolean;
    isSaved?: boolean;
    isLiked?: boolean;
}

export function ArticleCardDesktop({ article, priority = false, isSaved = false, isLiked = false }: ArticleCardDesktopProps) {
    return (
        <div className="block relative bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            {/* Main Link Overlay */}
            <Link
                href={routes.article(article.slug)}
                className="absolute inset-0 z-0"
                aria-label={`Read ${article.title}`}
            />

            {/* Cover Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={priority}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>

            {/* Content */}
            <div className="p-5 relative z-10 pointer-events-none">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
                        {article.category}
                    </span>
                    <span className="text-xs text-gray-500">·</span>
                    <span className="text-xs text-gray-500">{article.readTime} min read</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                </p>

                {/* Author & Engagement */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 pointer-events-auto">
                    {/* Author Link */}
                    <Link href={routes.author(article.author.id)} className="flex items-center gap-2 hover:opacity-80 transition-opacity relative z-20">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {article.author.name}
                        </span>
                    </Link>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <LikeButton
                            articleId={article.id}
                            initialLikes={article.likes}
                            initialIsLiked={isLiked}
                            className="pointer-events-auto"
                        />
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {formatNumber(article.comments)}
                        </span>
                        <BookmarkButton
                            articleId={article.id}
                            initialIsBookmarked={isSaved}
                            className="pointer-events-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper functions
function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}

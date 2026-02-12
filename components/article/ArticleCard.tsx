"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";

interface ArticleCardProps {
    article: Article;
    priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
    return (
        <div className="block relative bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors group">
            {/* Main Link Overlay */}
            <Link
                href={routes.article(article.slug)}
                className="absolute inset-0 z-0"
                aria-label={`Read ${article.title}`}
            />

            <article className="p-4 relative z-10 pointer-events-none">
                {/* Cover Image */}
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority={priority}
                    />
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase">
                        {article.category}
                    </span>
                    <span className="text-sm text-gray-500">·</span>
                    <span className="text-sm text-gray-500">{article.readTime} min read</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
                    {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                    {article.excerpt}
                </p>

                {/* Author & Engagement */}
                <div className="flex items-center justify-between pointer-events-auto">
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
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            {article.author.name}
                        </span>
                    </Link>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            {formatNumber(article.likes)}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {formatNumber(article.comments)}
                        </span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle bookmark
                            }}
                            className="hover:text-blue-600 transition-colors relative z-20 pointer-events-auto"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}

// Helper functions
function formatTimeAgo(date: string): string {
    const now = new Date();
    const published = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
}

function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}



import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";

import { BookmarkButton } from "@/components/article/BookmarkButton";
import { LikeButton } from "@/components/article/LikeButton";

interface ArticleCardProps {
    article: Article;
    priority?: boolean;
    isSaved?: boolean;
    isLiked?: boolean;
}

export function ArticleCard({ article, priority = false, isSaved = false, isLiked = false }: ArticleCardProps) {
    return (
        <div className="block relative bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            {/* Main Link Overlay */}
            <Link
                href={routes.article(article.slug)}
                className="absolute inset-0 z-0"
                aria-label={`Read ${article.title}`}
            />

            {/* Mobile Header: Author Info */}
            <div className="flex items-center gap-2 p-4 pb-2 lg:hidden relative z-20">
                <Link href={routes.author(article.author.id)} className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {article.author.name}
                    </span>
                </Link>
                <span className="text-xs text-gray-400">• {article.readTime} min read</span>
            </div>

            <article className="relative z-10 pointer-events-none">
                {/* Cover Image - Full Width on Mobile */}
                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] lg:rounded-lg overflow-hidden lg:mb-3 lg:mx-4 lg:w-[calc(100%-2rem)]">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Action Bar - Mobile Style */}
                <div className="flex items-center justify-between px-4 py-3 lg:hidden pointer-events-auto relative z-20">
                    <div className="flex items-center gap-4">
                        <LikeButton
                            articleId={article.id}
                            initialLikes={article.likes}
                            initialIsLiked={isLiked}
                            className="text-gray-900 dark:text-white hover:text-red-500"
                        />
                        <Link href={routes.article(article.slug) + "#comments"} className="text-gray-900 dark:text-white hover:text-blue-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </Link>
                        <button className="text-gray-900 dark:text-white hover:text-green-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                    <BookmarkButton
                        articleId={article.id}
                        initialIsBookmarked={isSaved}
                        className="text-gray-900 dark:text-white"
                    />
                </div>

                <div className="px-4 pb-4 lg:p-4 lg:pt-0">

                    {/* Desktop Meta Info */}
                    <div className="hidden lg:flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase">
                            {article.category}
                        </span>
                        <span className="text-sm text-gray-500">·</span>
                        <span className="text-sm text-gray-500">{article.readTime} min read</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 leading-tight">
                        {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3 lg:mb-3">
                        {article.excerpt}
                    </p>

                    {/* Mobile View Comments Count */}
                    <div className="lg:hidden mt-2">
                        <span className="text-sm text-gray-500">
                            View all {formatNumber(article.comments)} comments
                        </span>
                    </div>
                </div>

                {/* Desktop: Author & Engagement */}
                <div className="hidden lg:flex items-center justify-between px-4 pb-4 pointer-events-auto">
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
                        />
                    </div>
                </div>
            </article>
        </div>
    );
}

// Helper functions

function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}

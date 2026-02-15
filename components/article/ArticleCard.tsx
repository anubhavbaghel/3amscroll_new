

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
        <div className="block relative bg-white dark:bg-dark-surface border-b lg:border border-gray-100 dark:border-dark-border lg:rounded-2xl overflow-hidden lg:hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-300 group">
            {/* Main Link Overlay */}
            <Link
                href={routes.article(article.slug)}
                className="absolute inset-0 z-0"
                aria-label={`Read ${article.title}`}
            />

            {/* Mobile Header: Author Info */}
            <div className="flex items-center gap-2 p-4 pb-3 lg:hidden relative z-20">
                <Link href={routes.author(article.author.id)} className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white leading-none">
                            {article.author.name}
                        </span>
                    </div>
                </Link>
                <span className="ml-auto text-xs text-gray-400">
                    {article.readTime} min
                </span>
            </div>

            <article className="relative z-10 pointer-events-none flex flex-col h-full">
                {/* Cover Image - Full Width on Mobile */}
                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Action Bar - Mobile Style */}
                <div className="flex items-center justify-between px-4 py-3 lg:hidden pointer-events-auto relative z-20">
                    <div className="flex items-center gap-5">
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

                <div className="flex-1 flex flex-col px-4 pb-6 lg:p-5">
                    {/* Desktop Meta Info */}
                    <div className="hidden lg:flex items-center gap-2 mb-3">
                        <Link
                            href={routes.category(article.category)}
                            className="text-xs font-bold text-brand dark:text-brand-glow uppercase tracking-wider hover:underline relative z-20"
                        >
                            {article.category}
                        </Link>
                        <span className="text-xs text-gray-300 dark:text-gray-700">|</span>
                        <span className="text-xs text-gray-500">{article.readTime} min read</span>
                    </div>

                    {/* Title */}
                    <div className="mb-2">
                        <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight lg:group-hover:text-brand transition-colors">
                            {article.title}
                        </h2>
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 lg:line-clamp-3 mb-4 leading-relaxed">
                        {article.excerpt}
                    </p>

                    {/* Mobile View Likes Count */}
                    <div className="lg:hidden mt-auto">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white block mb-1">
                            {formatNumber(article.likes)} likes
                        </span>
                        <span className="text-xs text-gray-500">
                            View all {formatNumber(article.comments)} comments
                        </span>
                    </div>
                </div>

                {/* Desktop: Author & Engagement Footer */}
                <div className="hidden lg:flex items-center justify-between px-5 pb-5 pt-2 mt-auto border-t border-gray-50 dark:border-white/5 pointer-events-auto">
                    {/* Author Link */}
                    <Link href={routes.author(article.author.id)} className="flex items-center gap-2 group/author relative z-20">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100 dark:border-gray-800 group-hover/author:border-brand transition-colors">
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-200 group-hover/author:text-brand transition-colors">
                                {article.author.name}
                            </span>
                            <span className="text-[10px] text-gray-400">
                                {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <LikeButton
                            articleId={article.id}
                            initialLikes={article.likes}
                            initialIsLiked={isLiked}
                            className="bg-gray-50 dark:bg-white/5 p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        />
                        <BookmarkButton
                            articleId={article.id}
                            initialIsBookmarked={isSaved}
                            className="bg-gray-50 dark:bg-white/5 p-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
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

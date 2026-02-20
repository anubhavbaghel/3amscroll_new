

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
    rank?: number;
    className?: string;
}

export function ArticleCard({ article, priority = false, isSaved = false, isLiked = false, rank, className }: ArticleCardProps) {
    return (
        <div className={`group relative flex flex-col bg-white dark:bg-dark-surface rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-brand/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full ${className}`}>
            {/* Rank Number (Absolute) - Only if rank is provided */}
            {rank && (
                <div className="absolute top-2 right-4 text-6xl font-black text-gray-100 dark:text-white/5 font-logo z-0 pointer-events-none select-none">
                    {rank.toString().padStart(2, '0')}
                </div>
            )}

            {/* Main Link Overlay */}
            <Link
                href={routes.article(article.slug)}
                className="absolute inset-0 z-0"
                aria-label={`Read ${article.title}`}
            />

            {/* Image Container - Conditional */}
            {article.coverImage ? (
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay (Subtle) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Category Badge (Top Left) */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10 shadow-lg">
                            {article.category}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="pt-10 px-6 pb-2 border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.02]">
                    <span className="text-brand text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-brand/10 rounded-full border border-brand/20 inline-block mb-6">
                        {article.category}
                    </span>
                    <div className="absolute top-6 right-6 opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.59 2.59c-.38-.38-.89-.59-1.42-.59H4.99c-1.1 0-2 .9-2 2v15.99c0 1.1.89 2 2 2h14.01c1.1 0 2-.9 2-2V8c0-.53-.21-1.04-.59-1.41l-4.83-4.83zM15 19H5V4h7v5h5v10z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 p-4 md:p-5 flex flex-col relative z-10 pointer-events-none">
                {/* Meta Row */}
                <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-3 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <span>{article.readTime} min read</span>
                        <span>•</span>
                        {article.publishedAt && (
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h2 className={`${article.coverImage ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-bold mb-3 leading-tight text-gray-900 dark:text-gray-100 group-hover:text-brand transition-colors font-display line-clamp-3`}>
                    {article.title}
                </h2>

                {/* Excerpt */}
                <p className={`text-gray-700 text-sm mb-4 leading-relaxed dark:text-gray-400 ${article.coverImage ? 'line-clamp-2' : 'line-clamp-4'}`}>
                    {article.excerpt}
                </p>

                {/* Footer / Actions - Visible on ALL screens */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between pointer-events-auto">
                    {/* Author (Left) */}
                    <Link href={routes.author(article.author.id)} className="flex items-center gap-2 group/author hover:opacity-80 transition-opacity relative z-20">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {article.author.avatar ? (
                                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-400">
                                    {article.author.name?.[0]?.toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover/author:text-brand">
                                {article.author.name}
                            </span>
                        </div>
                    </Link>

                    {/* Engagement Buttons (Right) */}
                    <div className="flex items-center gap-3 relative z-20">
                        <div className="hidden md:flex items-center gap-4 text-gray-400 text-xs font-medium">
                            <span className="flex items-center gap-1.5">
                                <LikeButton
                                    articleId={article.id}
                                    initialLikes={article.likes}
                                    initialIsLiked={isLiked}
                                    className="hover:text-red-500 transition-colors"
                                />
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {formatNumber(article.comments)}
                            </span>
                        </div>

                        {/* Mobile: Just Icons */}
                        <div className="md:hidden flex items-center gap-3 text-gray-400">
                            <LikeButton
                                articleId={article.id}
                                initialLikes={article.likes}
                                initialIsLiked={isLiked}
                                className="hover:text-red-500 transition-colors"
                            />
                            <Link href={routes.article(article.slug) + "#comments"} className="hover:text-blue-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </Link>
                        </div>

                        <BookmarkButton
                            articleId={article.id}
                            initialIsBookmarked={isSaved}
                            className="text-gray-400 hover:text-brand transition-colors"
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



import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";

import { BookmarkButton } from "@/components/article/BookmarkButton";
import { LikeButton } from "@/components/article/LikeButton";

interface ArticleHeroProps {
    article: Article;
    isSaved?: boolean;
    isLiked?: boolean;
}

export function ArticleHero({ article, isSaved = false, isLiked = false }: ArticleHeroProps) {
    return (
        <div className="block relative h-[100dvh] lg:h-[85vh] w-full overflow-hidden group">
            {/* Main Article Link (Overlay) */}
            <Link
                href={routes.article(article.slug)}
                className="absolute inset-0 z-10"
                aria-label={`Read ${article.title}`}
            />

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                    sizes="100vw"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 lg:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60" />
            </div>

            {/* Bookmark/Like Buttons (Top Right) */}
            <div className="absolute top-safe-offset right-4 lg:top-8 lg:right-8 z-30 flex flex-col gap-3 pt-4 lg:pt-0">
                <BookmarkButton
                    articleId={article.id}
                    initialIsBookmarked={isSaved}
                    className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 text-white hover:text-blue-400 bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all hover:bg-white/20 active:scale-95"
                />
                <LikeButton
                    articleId={article.id}
                    initialLikes={article.likes}
                    initialIsLiked={isLiked}
                    className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 text-white hover:text-red-500 bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all hover:bg-white/20 active:scale-95"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 lg:p-12 pb-24 lg:pb-16 text-white pointer-events-none max-w-7xl mx-auto w-full">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-brand/80 backdrop-blur-md border border-white/20 text-xs lg:text-sm font-bold tracking-wider mb-4 lg:mb-6 w-fit shadow-lg shadow-brand/20 uppercase animate-fade-in-up">
                    {article.category}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 lg:mb-6 leading-[0.9] tracking-tight font-display text-white drop-shadow-lg animate-fade-in-up delay-100">
                    {article.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-2 max-w-3xl font-medium leading-relaxed animate-fade-in-up delay-200">
                    {article.excerpt}
                </p>

                {/* Author Link - Interactive */}
                <div className="animate-fade-in-up delay-300">
                    <Link
                        href={routes.author(article.author.id)}
                        className="flex items-center gap-3 lg:gap-4 group/author pointer-events-auto w-fit p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-white/50 group-hover/author:border-brand transition-colors">
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base lg:text-lg text-white group-hover/author:text-brand transition-colors">
                                {article.author.name}
                            </span>
                            <span className="text-xs lg:text-sm text-gray-300 font-medium flex items-center gap-2">
                                {formatTimeAgo(article.publishedAt)}
                                <span className="w-1 h-1 rounded-full bg-gray-400" />
                                {article.readTime} min read
                            </span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce hidden lg:block">
                <svg
                    className="w-6 h-6 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </div>
    );
}

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

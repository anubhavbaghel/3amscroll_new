"use client";

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
        <div className="block relative h-screen lg:h-full w-full overflow-hidden group">
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
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Bookmark Button */}
            <div className="absolute top-6 right-6 z-30 flex flex-col gap-3">
                <BookmarkButton
                    articleId={article.id}
                    initialIsBookmarked={isSaved}
                    className="text-white hover:text-blue-400 bg-black/20 backdrop-blur-md p-2 rounded-full"
                />
                <LikeButton
                    articleId={article.id}
                    initialLikes={article.likes}
                    initialIsLiked={isLiked}
                    className="text-white hover:text-red-500 bg-black/20 backdrop-blur-md p-2 rounded-full"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 lg:p-8 pb-32 lg:pb-12 text-white pointer-events-none">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/90 backdrop-blur-md border border-white/10 text-sm font-bold tracking-wide mb-4 w-fit shadow-lg shadow-brand/20">
                    <span className="uppercase">{article.category}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 line-clamp-3 leading-snug font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 drop-shadow-sm">
                    {article.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-2 max-w-2xl font-medium">
                    {article.excerpt}
                </p>

                {/* Author Link - Interactive */}
                <Link
                    href={routes.author(article.author.id)}
                    className="flex items-center gap-3 group/author pointer-events-auto w-fit"
                >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white group-hover/author:border-blue-400 transition-colors">
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-semibold group-hover/author:text-blue-400 transition-colors">{article.author.name}</p>
                        <p className="text-sm text-gray-300">
                            {formatTimeAgo(article.publishedAt)} · {article.readTime} min read
                        </p>
                    </div>
                </Link>
            </div>

            {/* Scroll Indicator - Mobile Only */}
            <div className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 pointer-events-none">
                <svg
                    className="w-6 h-6 text-white"
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

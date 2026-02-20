

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
        <div className="block relative h-[100dvh] lg:h-full w-full overflow-hidden group">
            {/* Main Article Link (Overlay) */}
            <Link
                href={routes.article(article.slug)}
                className="absolute inset-0 z-10"
                aria-label={`Read ${article.title}`}
            />

            {/* Background Image or Typographic Texture */}
            <div className="absolute inset-0">
                {article.coverImage ? (
                    <>
                        <Image
                            src={article.coverImage}
                            alt={`${article.title} - Cover Image`}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            priority
                            fetchPriority="high"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1536px) 80vw, 1200px"
                        />
                        {/* Enhanced Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 lg:opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex flex-wrap gap-12 p-12 text-white font-black text-8xl uppercase tracking-tighter">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <span key={i} className="whitespace-nowrap">{article.category}</span>
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-brand/5 to-purple-500/10" />
                    </div>
                )}
            </div>

            {/* Bookmark/Like Buttons (Top Right) */}
            <div className="absolute top-safe-offset right-4 lg:top-8 lg:right-8 z-30 flex flex-col gap-3 pt-4 lg:pt-0">
                <BookmarkButton
                    articleId={article.id}
                    initialIsBookmarked={isSaved}
                    aria-label={isSaved ? "Remove from bookmarks" : "Add to bookmarks"}
                    className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 text-white hover:text-blue-400 bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all hover:bg-white/20 active:scale-95"
                />
                <LikeButton
                    articleId={article.id}
                    initialLikes={article.likes}
                    initialIsLiked={isLiked}
                    aria-label={isLiked ? "Unlike article" : "Like article"}
                    className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 text-white hover:text-red-500 bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all hover:bg-white/20 active:scale-95"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 lg:p-10 pb-24 lg:pb-12 text-white pointer-events-none max-w-7xl mx-auto w-full">
                {/* Styled Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/90 backdrop-blur-md border border-white/20 text-[0.6875rem] font-black tracking-[0.05em] mb-4 w-fit shadow-lg shadow-brand/20 uppercase animate-fade-in-up">
                    FEATURED STORY
                </div>

                {/* Title */}
                <h1 className="text-[2rem] md:text-[3rem] font-bold mb-6 leading-[1.1] tracking-tight font-display text-white drop-shadow-lg animate-fade-in-up delay-100 max-w-4xl">
                    {article.title}
                </h1>

                {/* Simple Metadata Row (Julian Voss Style) */}
                <div className="flex items-center gap-2 text-[0.875rem] md:text-[1rem] font-bold text-gray-200/90 animate-fade-in-up delay-200">
                    <Link href={routes.author(article.author.id)} className="hover:text-white transition-colors">
                        By {article.author.name}
                    </Link>
                    <span className="opacity-60 text-lg leading-none">•</span>
                    <span>{article.readTime} Min Read</span>
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

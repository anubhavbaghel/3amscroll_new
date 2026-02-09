"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";

interface ArticleHeroProps {
    article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
    return (
        <Link
            href={routes.article(article.slug)}
            className="block relative h-screen lg:h-full w-full overflow-hidden group"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 lg:p-8 pb-32 lg:pb-12 text-white">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-4 w-fit">
                    <span className="uppercase">{article.category}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold mb-4 line-clamp-3 group-hover:text-blue-400 transition-colors">
                    {article.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg text-gray-200 mb-4 line-clamp-2 max-w-2xl">
                    {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-semibold">{article.author.name}</p>
                        <p className="text-sm text-gray-300">
                            {formatTimeAgo(article.publishedAt)} · {article.readTime} min read
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Mobile Only */}
            <div className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
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
        </Link>
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

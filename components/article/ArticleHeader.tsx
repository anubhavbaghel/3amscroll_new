"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";
import { ShareButton } from "@/components/article/ShareButton";

interface ArticleHeaderProps {
    article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
    const articleUrl = `https://3amscroll.com/article/${article.slug}`;

    return (
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-36 lg:pt-44 pb-8">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
                {article.title}
            </h1>

            {/* Subtitle/Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {article.excerpt}
            </p>

            {/* Author Info + Share */}
            <div className="flex items-center justify-between pb-8 border-b border-gray-200 dark:border-gray-800">
                <Link href={routes.author(article.author.id)} className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                            {article.author.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <span>{formatDate(article.publishedAt)}</span>
                            <span>·</span>
                            <span>{article.readTime} min read</span>
                        </div>
                    </div>
                </Link>

                {/* Share button — visible on desktop */}
                <ShareButton
                    title={article.title}
                    excerpt={article.excerpt}
                    url={articleUrl}
                    showLabel={true}
                    className="hidden lg:flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                />
            </div>
        </header>
    );
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

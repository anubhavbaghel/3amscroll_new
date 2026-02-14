"use client";

import Link from "next/link";
import { Article } from "@/types";
import { routes } from "@/config/routes";
import Image from "next/image";

interface ArticleContentProps {
    article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
    return (
        <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Article Header */}
            <header className="not-prose mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                    {article.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
                    <Link href={routes.author(article.author.id)} className="flex items-center gap-2 group hover:text-blue-600 transition-colors">
                        <div className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                            <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">{article.author.name}</div>
                            <div className="text-xs">{formatDate(article.publishedAt)}</div>
                        </div>
                    </Link>
                    <span>•</span>
                    <span>{article.readTime} min read</span>
                    <span>•</span>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {formatNumber(article.views)}
                        </span>
                    </div>
                </div>
            </header>

            {/* Article Body - Render actual content from database */}
            <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </article>
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

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

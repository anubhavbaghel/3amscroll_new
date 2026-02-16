"use client";

import { Article } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ArticleCard } from "@/components/article/ArticleCard";

interface TrendingGridProps {
    articles: Article[];
}

export function TrendingGrid({ articles }: TrendingGridProps) {
    if (articles.length === 0) return null;

    return (
        <section>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-white/10">
                <h2 className="text-2xl font-bold font-logo uppercase tracking-tight">Going Viral</h2>
                <span className="text-sm font-medium text-gray-500">{articles.length} Stories</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} rank={index + 4} />
                ))}
            </div>
        </section>
    );
}

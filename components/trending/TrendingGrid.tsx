"use client";

import { Article } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Eye, Clock } from "lucide-react";

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
                    <TrendingGridItem key={article.id} article={article} index={index + 4} />
                ))}
            </div>
        </section>
    );
}

function TrendingGridItem({ article, index }: { article: Article; index: number }) {
    return (
        <Link href={`/article/${article.slug}`} className="group relative flex flex-col bg-white dark:bg-dark-surface rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-brand/30 transition-all hover:shadow-xl hover:-translate-y-1">
            {/* Rank Number (Absolute) */}
            <div className="absolute top-2 right-4 text-6xl font-black text-gray-100 dark:text-white/5 font-logo z-0 pointer-events-none">
                {index.toString().padStart(2, '0')}
            </div>

            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {article.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 relative z-10">
                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-brand transition-colors line-clamp-2 font-display">
                    {article.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Just now"}
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {article.views?.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}

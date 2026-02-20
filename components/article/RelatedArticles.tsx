"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";
import { useRef } from "react";

interface RelatedArticlesProps {
    articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h2>

                {/* Navigation Arrows - Now visible on all devices */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Horizontal Scrolling Container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {articles.slice(0, 6).map((article) => (
                    <Link
                        key={article.id}
                        href={routes.article(article.slug)}
                        className="group flex-shrink-0 w-[320px] snap-start"
                    >
                        <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand dark:hover:border-brand transition-all h-full">
                            {/* Image */}
                            <div className="aspect-video bg-gray-100 dark:bg-[#0B1221] relative overflow-hidden flex items-center justify-center">
                                {article.coverImage ? (
                                    <>
                                        <Image
                                            src={article.coverImage}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="320px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </>
                                ) : (
                                    <span className="text-2xl font-black tracking-[0.2em] text-blue-400/90 font-display">
                                        3AM
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="text-xs font-semibold text-brand uppercase mb-2">
                                    {article.category}
                                </div>
                                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-brand transition-colors text-gray-900 dark:text-white">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2 mb-3">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                                    <span>{article.author.name}</span>
                                    <span>•</span>
                                    <span>{article.readTime} min read</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* CSS to hide scrollbar */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}

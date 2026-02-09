"use client";

import Link from "next/link";
import { Article } from "@/types";
import { routes } from "@/config/routes";

interface RelatedArticlesProps {
    articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
    return (
        <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(0, 3).map((article) => (
                    <Link
                        key={article.id}
                        href={routes.article(article.slug)}
                        className="group"
                    >
                        <article className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Image */}
                            <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mb-2">
                                    {article.category}
                                </div>
                                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                    <span>{article.author}</span>
                                    <span>•</span>
                                    <span>{article.readTime} min read</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}

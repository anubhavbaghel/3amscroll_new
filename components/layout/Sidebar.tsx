"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { Article } from "@/types";

interface SidebarProps {
    trendingArticles?: Article[];
}

export function Sidebar({ trendingArticles = [] }: SidebarProps) {
    return (
        <aside className="hidden lg:block lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-24 space-y-6">
                {/* Trending Now */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Trending Now
                    </h2>
                    <div className="space-y-4">
                        {trendingArticles.slice(0, 5).map((article, index) => (
                            <Link
                                key={article.id}
                                href={routes.article(article.slug)}
                                className="block group"
                            >
                                <div className="flex gap-3">
                                    <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {article.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                            <span>{article.category}</span>
                                            <span>·</span>
                                            <span>{article.readTime} min</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Explore Topics</h2>
                    <div className="flex flex-wrap gap-2">
                        {siteConfig.categories.map((category) => (
                            <Link
                                key={category.id}
                                href={routes.category(category.slug)}
                                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                    <h2 className="text-xl font-bold mb-2">Stay Updated</h2>
                    <p className="text-sm text-blue-100 mb-4">
                        Get the latest stories delivered to your inbox every week.
                    </p>
                    <form className="space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-xs text-blue-100 mt-3">
                        No spam, unsubscribe anytime.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <div className="space-y-2">
                        <Link
                            href={routes.about}
                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-sm font-medium transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href={routes.saved}
                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-sm font-medium transition-colors"
                        >
                            Saved Articles
                        </Link>
                        <Link
                            href={routes.settings}
                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-sm font-medium transition-colors"
                        >
                            Settings
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
}

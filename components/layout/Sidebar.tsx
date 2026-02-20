import Link from "next/link";
import Image from "next/image";
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
                {/* Editors' Picks (formerly Trending) */}
                <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl p-6">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-6">
                        <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 dark:text-white">
                            Editors' Picks
                        </h2>
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="19" cy="12" r="1.5" />
                            <circle cx="5" cy="12" r="1.5" />
                        </svg>
                    </div>

                    <div className="space-y-6">
                        {trendingArticles.slice(0, 5).map((article) => {
                            const hasImage = article.coverImage && article.coverImage.length > 0;

                            return (
                                <Link
                                    key={article.id}
                                    href={routes.article(article.slug)}
                                    className="block group"
                                >
                                    <div className="flex gap-4 items-start">
                                        {/* Square Thumbnail - Cleaned up to avoid weird borders */}
                                        <div className="relative w-[88px] h-[88px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0B1221] flex items-center justify-center">
                                            {hasImage ? (
                                                <Image
                                                    src={article.coverImage}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <span className="text-[0.85rem] font-black tracking-[0.2em] text-blue-400/90 font-display">
                                                    3AM
                                                </span>
                                            )}
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <div className="text-[11px] font-bold uppercase tracking-widest text-[#4461F2] dark:text-blue-400 mb-1.5">
                                                {article.category}
                                            </div>
                                            <h3 className="font-bold text-base leading-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <div className="mt-2 text-[12px] font-medium text-gray-700 dark:text-gray-400 tracking-wide uppercase">
                                                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl p-6">
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
                <div className="bg-gradient-to-br from-brand-dark to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-brand/20">
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
                <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl p-6">
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

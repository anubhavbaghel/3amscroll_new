"use client";

import { useState, useEffect } from "react";
import { Search, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Article } from "@/types";

// Mock hook if not exists, or I will create it next.
// Actually, let's implement debounce logic directly here for simplicity if hook is missing, 
// but checking if we have hooks folder first would be good. 
// I'll implement a simple internal debounce for now to be safe.

interface SearchPageContentProps {
    initialArticles: Article[];
}

export function SearchPageContent({ initialArticles }: SearchPageContentProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Article[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Simple trending topics
    const trendingTopics = ["Artificial Intelligence", "Crypto", "Gaming", "Startups", "Design", "mental Health"];

    useEffect(() => {
        const searchArticles = () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            // Client-side filtering for demo. In production, this would be a server action or API call.
            const filtered = initialArticles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                article.category.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            setIsSearching(false);
        };

        const timeoutId = setTimeout(() => {
            if (query) setIsSearching(true);
            searchArticles();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, initialArticles]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Search Input Section */}
                <div className="relative mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-20"
                    >
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search stories, topics, or authors..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-white dark:bg-dark-surface border-2 border-transparent focus:border-brand dark:focus:border-brand-glow outline-none rounded-3xl py-6 pl-20 pr-8 text-2xl md:text-3xl font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none transition-all"
                            autoFocus
                        />
                    </motion.div>
                </div>

                {/* Empty State / Trending */}
                {!query && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="mb-12">
                            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                                <TrendingUp className="w-4 h-4" />
                                Trending Topics
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {trendingTopics.map((topic, i) => (
                                    <button
                                        key={topic}
                                        onClick={() => setQuery(topic)}
                                        className="px-6 py-3 rounded-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 hover:border-brand hover:text-brand dark:hover:border-brand transition-all text-lg font-medium"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Discover Section (Random suggestions) */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                                Discover
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 hover:opacity-100 transition-opacity">
                                {initialArticles.slice(0, 4).map(article => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Search Results */}
                <AnimatePresence>
                    {query && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {results.length > 0 ? (
                                <div className="space-y-8">
                                    <p className="text-gray-500">
                                        Found {results.length} result{results.length !== 1 ? 's' : ''} for <span className="text-gray-900 dark:text-white font-bold">"{query}"</span>
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {results.map((article) => (
                                            <ArticleCard key={article.id} article={article} />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-xl text-gray-500">No stories found for "{query}"</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}

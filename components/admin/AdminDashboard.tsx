"use client";

import { AdminActionBar } from "./AdminActionBar";
import { AdminArticleCard } from "./AdminArticleCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { updateArticleStatus } from "@/app/admin/actions";
import { useState } from "react";

interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    cover_image: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface AdminDashboardProps {
    initialArticles: Article[];
}

export function AdminDashboard({ initialArticles }: AdminDashboardProps) {
    const [articles, setArticles] = useState(initialArticles);

    const handleUpdateStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        try {
            await updateArticleStatus(id, newStatus);
            // Optimistic UI update
            setArticles(prev => prev.map(art =>
                art.id === id ? { ...art, status: newStatus } : art
            ));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    return (
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
            <AdminActionBar />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article) => (
                    <AdminArticleCard
                        key={article.id}
                        article={article}
                        onUpdateStatus={handleUpdateStatus}
                    />
                ))}

                {/* Create New Article Button Card */}
                <Link
                    href="/admin/articles/new"
                    className="group relative flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-100 dark:border-slate-700">
                        <Plus className="text-primary w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <p className="font-display font-bold text-slate-900 dark:text-white">Create New Article</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Start writing your next story</p>
                    </div>
                </Link>
            </div>

            {/* Pagination Placeholder */}
            {articles.length > 0 && (
                <div className="mt-12 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-8">
                    <p className="text-sm text-slate-500 font-medium">Showing 1 to {articles.length} of {articles.length} articles</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-sm font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>Previous</button>
                        <button className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-primary text-white rounded-xl">1</button>
                        <button className="px-4 py-2 text-sm font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors" disabled>Next</button>
                    </div>
                </div>
            )}
        </main>
    );
}

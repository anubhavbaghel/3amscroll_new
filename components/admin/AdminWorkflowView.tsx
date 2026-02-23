"use client";

import { ArticleWorkflow } from "./ArticleWorkflow";
import { Plus, LayoutList, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Article {
    id: string;
    title: string;
    status: string;
    cover_image?: string;
    created_at: string;
}

interface AdminWorkflowViewProps {
    articles: Article[];
    onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export function AdminWorkflowView({ articles, onUpdateStatus }: AdminWorkflowViewProps) {
    if (articles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 dark:bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <LayoutList className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-[280px] text-center">
                    Start your content journey by creating your first article draft.
                </p>
                <Link
                    href="/admin/articles/new"
                    className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Create First Article
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                    <span className="w-8 h-px bg-slate-200 dark:bg-slate-800" />
                    Content Pipeline
                    <span className="w-8 h-px bg-slate-200 dark:bg-slate-800" />
                </h2>
                <p className="text-xs font-bold text-slate-500">
                    {articles.length} Active Articles
                </p>
            </div>

            <div className="space-y-6">
                {articles.map((article) => (
                    <div key={article.id} className="relative group">
                        {/* Connecting Line for Feed effect */}
                        <div className="absolute -left-4 top-10 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 group-last:hidden" />

                        <ArticleWorkflow
                            article={article as any}
                            onUpdateStatus={onUpdateStatus}
                        />

                        {/* Quick View Link */}
                        <Link
                            href={`/admin/articles/${article.id}/edit`}
                            className="absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Bottom Action */}
            <Link
                href="/admin/articles/new"
                className="block p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
                <div className="flex items-center justify-center gap-3">
                    <Plus className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        Create another article
                    </span>
                </div>
            </Link>
        </div>
    );
}

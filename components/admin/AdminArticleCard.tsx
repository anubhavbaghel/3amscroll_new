"use client";

import Image from "next/image";
import Link from "next/link";
import {
    MoreHorizontal,
    Eye,
    Edit2,
    Trash2,
    CheckCircle,
    Clock,
    ExternalLink
} from "lucide-react";
import { useState } from "react";
import { DeleteArticleButton } from "./DeleteArticleButton";

interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    cover_image: string;
    status: string;
    created_at: string;
}

interface AdminArticleCardProps {
    article: Article;
    onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export function AdminArticleCard({ article, onUpdateStatus }: AdminArticleCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusToggle = async () => {
        setIsUpdating(true);
        await onUpdateStatus(article.id, article.status);
        setIsUpdating(false);
        setIsMenuOpen(false);
    };

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
            {/* Header/Image Section - Only show if image exists */}
            {article.cover_image && (
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border ${article.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}>
                            {article.status === 'published' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {article.status}
                        </div>
                    </div>

                    {/* Actions Trigger */}
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white rounded-full shadow-sm hover:scale-110 transition-transform"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {/* Action Menu Dropdown */}
                        {isMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                    <Link href={`/article/${article.slug}`} target="_blank" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <ExternalLink className="w-4 h-4" /> View Live
                                    </Link>
                                    <Link href={`/admin/articles/${article.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <Edit2 className="w-4 h-4" /> Edit Content
                                    </Link>
                                    <button
                                        onClick={handleStatusToggle}
                                        disabled={isUpdating}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                                    >
                                        {article.status === 'published' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                        {article.status === 'published' ? 'Move to Draft' : 'Publish Article'}
                                    </button>
                                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                                    <div className="px-1">
                                        <DeleteArticleButton variant="minimal" id={article.id} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                            {article.category}
                        </span>
                        {!article.cover_image && (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${article.status === 'published'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                }`}>
                                {article.status === 'published' ? <CheckCircle className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                                {article.status}
                            </div>
                        )}
                    </div>

                    {!article.cover_image && (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-7 h-7 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <MoreHorizontal className="w-3.5 h-3.5" />
                            </button>

                            {/* Action Menu Dropdown for No-Image Card */}
                            {isMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                        <Link href={`/article/${article.slug}`} target="_blank" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <ExternalLink className="w-4 h-4" /> View Live
                                        </Link>
                                        <Link href={`/admin/articles/${article.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <Edit2 className="w-4 h-4" /> Edit Content
                                        </Link>
                                        <button
                                            onClick={handleStatusToggle}
                                            disabled={isUpdating}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                                        >
                                            {article.status === 'published' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                            {article.status === 'published' ? 'Move to Draft' : 'Publish Article'}
                                        </button>
                                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                                        <div className="px-1">
                                            <DeleteArticleButton variant="minimal" id={article.id} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <h3 className={`font-display font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors mb-2 line-clamp-2`}>
                    {article.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {article.excerpt}
                </p>
            </div>

            {/* Bottom Actions Bar */}
            <div className={`px-5 pb-5 flex items-center justify-between gap-4 ${!article.cover_image ? 'pt-2' : ''}`}>
                <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-2 h-9 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                </Link>
                <Link
                    href={`/article/${article.slug}`}
                    target="_blank"
                    className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-xl hover:text-primary hover:border-primary/50 transition-all"
                >
                    <Eye className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

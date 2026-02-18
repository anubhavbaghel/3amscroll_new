"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteUserArticle } from "@/app/actions/user-article";

interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    status: string;
    slug: string;
    created_at: string;
    read_time: number;
}

export default function MyArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchArticles = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login?redirect=/my-articles");
                return;
            }

            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .eq("author_uuid", user.id)
                .order("created_at", { ascending: false });

            if (data) {
                setArticles(data);
            }
            setLoading(false);
        };

        fetchArticles();
    }, [router, supabase]);

    const handleDelete = async (articleId: string) => {
        if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;

        const result = await deleteUserArticle(articleId);

        if (result.success) {
            setArticles(articles.filter(a => a.id !== articleId));
        } else {
            alert(result.error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-44 lg:pt-32">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-display mb-2">My Articles</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your published and draft articles
                        </p>
                    </div>
                    <Link
                        href="/write"
                        className="px-6 py-3 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Article
                    </Link>
                </div>

                {articles.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                        <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start writing your first article to share with the community
                        </p>
                        <Link
                            href="/write"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Write Your First Article
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {articles.map((article) => (
                            <div
                                key={article.id}
                                className="border border-gray-200 dark:border-dark-border rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-dark-surface"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="text-xl font-semibold font-display">
                                                {article.title}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${article.status === 'published'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {article.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>{article.category}</span>
                                            <span>•</span>
                                            <span>{article.read_time || 5} min read</span>
                                            <span>•</span>
                                            <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:self-center">
                                        {article.status === 'published' && (
                                            <Link
                                                href={`/article/${article.slug}`}
                                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors text-sm"
                                            >
                                                View
                                            </Link>
                                        )}
                                        <Link
                                            href={`/write/${article.id}`} // We need to ensure dynamic route [id] exists for editing
                                            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


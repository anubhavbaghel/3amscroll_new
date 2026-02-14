import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getUserArticles } from "@/app/actions/user-article";

export const metadata: Metadata = {
    title: "My Articles | 3AM SCROLL",
    description: "Manage your articles",
};

export default async function MyArticlesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?redirect=/my-articles");
    }

    const result = await getUserArticles();
    const articles = result.articles || [];

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <div className="text-center py-16">
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
                                className="border border-gray-200 dark:border-dark-border rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
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
                                            <span>{article.read_time} min read</span>
                                            <span>•</span>
                                            <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        {article.status === 'published' && (
                                            <Link
                                                href={`/article/${article.slug}`}
                                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors text-sm"
                                            >
                                                View
                                            </Link>
                                        )}
                                        <Link
                                            href={`/write/${article.id}`}
                                            className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white transition-colors text-sm"
                                        >
                                            Edit
                                        </Link>
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

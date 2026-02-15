import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSavedArticleIds, getArticles } from "@/lib/data";
import { ArticleCard } from "@/components/article/ArticleCard";
import { routes } from "@/config/routes";
import { Bookmark, LayoutGrid, List } from "lucide-react";

export const metadata = {
    title: "My Library | 3AM SCROLL",
    description: "Your curated collection of stories.",
};

export default async function SavedPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect(routes.login);
    }

    // Fetch all Saved IDs
    const savedIds = await getSavedArticleIds(user.id);
    const allArticles = await getArticles();
    const savedArticles = allArticles.filter(article => savedIds.has(article.id));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
            {/* Header */}
            <div className="pt-32 pb-12 px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 text-brand mb-4">
                        <Bookmark className="w-6 h-6" />
                        <span className="text-sm font-bold uppercase tracking-widest">My Library</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white font-display tracking-tight">
                        Saved Stories
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl">
                        Your personal collection of deep dives, quick reads, and inspiration.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
                {/* Controls (Placeholder for future List/Grid toggle) */}
                {savedArticles.length > 0 && (
                    <div className="flex justify-end mb-8 gap-2">
                        <button className="p-2 rounded-lg bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <LayoutGrid className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <List className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                )}

                {savedArticles.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border border-dashed">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bookmark className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No stories saved yet</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Start curating your own magazine. Save stories you love to read them later.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-brand text-white font-bold hover:bg-brand-dark transition-all transform hover:scale-105"
                        >
                            Explore Stories
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {savedArticles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                isSaved={true}
                            // We can add a "reading progress" prop here in the future
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

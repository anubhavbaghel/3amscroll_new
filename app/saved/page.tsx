import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSavedArticleIds, getArticles } from "@/lib/data";
import { ArticleCardDesktop } from "@/components/article/ArticleCardDesktop"; // Reuse desktop card
import { ArticleCard } from "@/components/article/ArticleCard"; // Reuse mobile card
import { routes } from "@/config/routes";

export default async function SavedPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect(routes.login);
    }

    // Fetch all Saved IDs
    const savedIds = await getSavedArticleIds(user.id);

    // Fetch all articles (In a real app, we would query DB for ONLY these IDs: WHERE id IN (...))
    // For now, with our data helper, we fetch all and filter. 
    // Optimization: Update lib/data.ts to `getArticlesByIds(ids)`
    const allArticles = await getArticles();
    const savedArticles = allArticles.filter(article => savedIds.has(article.id));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Saved Articles</h1>

                {savedArticles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-4">You haven't saved any articles yet.</p>
                        <a href="/" className="text-blue-600 hover:underline">Explore stories</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedArticles.map((article) => (
                            <div key={article.id}>
                                <div className="hidden lg:block">
                                    <ArticleCardDesktop article={article} isSaved={true} />
                                </div>
                                <div className="lg:hidden">
                                    <ArticleCard article={article} isSaved={true} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

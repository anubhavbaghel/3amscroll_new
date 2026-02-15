import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/layout/Sidebar").then((mod) => mod.Sidebar));
import { Footer } from "@/components/layout/Footer";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleGrid } from "@/components/home/ArticleGrid";
import { getArticles, getTrendingArticles, getSavedArticleIds, getLikedArticleIds } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const [allArticles, trendingArticles, savedArticleIds, likedArticleIds] = await Promise.all([
        getArticles(),
        getTrendingArticles(),
        user ? getSavedArticleIds(user.id) : Promise.resolve(new Set<string>()),
        user ? getLikedArticleIds(user.id) : Promise.resolve(new Set<string>())
    ]);
    const [heroArticle, ...feedArticles] = allArticles;

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg">
            {/* Mobile Header */}

            {/* Main Content */}
            <main>
                {/* Hero Article - Full Screen on Mobile, Contained on Desktop */}
                <div className="lg:hidden">
                    <div className="pt-[140px]">
                        <ArticleHero
                            article={heroArticle}
                            isSaved={savedArticleIds.has(heroArticle.id)}
                            isLiked={likedArticleIds.has(heroArticle.id)}
                        />
                    </div>
                </div>

                {/* Desktop Layout with Sidebar */}
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                    <div className="flex gap-8">
                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0">
                            {/* Desktop Hero - Smaller, Contained */}
                            <div className="hidden lg:block mb-8">
                                <div className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                                    <ArticleHero
                                        article={heroArticle}
                                        isSaved={savedArticleIds.has(heroArticle.id)}
                                        isLiked={likedArticleIds.has(heroArticle.id)}
                                    />
                                </div>
                            </div>

                            {/* Article Grid */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                                        Latest Stories
                                    </h2>
                                </div>

                                <ArticleGrid
                                    articles={feedArticles}
                                    savedArticleIds={savedArticleIds}
                                    likedArticleIds={likedArticleIds}
                                />
                            </div>

                            {/* Load More */}
                            <div className="py-12 flex justify-center">
                                <button className="px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    Load more stories
                                </button>
                            </div>
                        </div>

                        {/* Sidebar - Desktop Only */}
                        <Sidebar trendingArticles={trendingArticles} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ArticleCardDesktop } from "@/components/article/ArticleCardDesktop";
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
                                <h2 className="text-2xl font-bold hidden lg:block">Latest Stories</h2>

                                {/* Mobile: Vertical List */}
                                <div className="lg:hidden pt-[140px]">
                                    {feedArticles.map((article, index) => (
                                        <ArticleCard
                                            key={article.id}
                                            article={article}
                                            priority={index < 3}
                                            isSaved={savedArticleIds.has(article.id)}
                                            isLiked={likedArticleIds.has(article.id)}
                                        />
                                    ))}
                                </div>

                                {/* Desktop: 2-Column Grid */}
                                <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                                    {feedArticles.map((article, index) => (
                                        <ArticleCardDesktop
                                            key={article.id}
                                            article={article}
                                            priority={index < 4}
                                            isSaved={savedArticleIds.has(article.id)}
                                            isLiked={likedArticleIds.has(article.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Load More */}
                            <div className="p-8 text-center">
                                <div className="inline-flex items-center gap-2 text-gray-500">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Loading more stories...</p>
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

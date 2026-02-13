import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ArticleContent } from "@/components/article/ArticleContent";
import { AuthorCard } from "@/components/article/AuthorCard";
import { EngagementBar } from "@/components/article/EngagementBar";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { mockArticles } from "@/lib/mock-data";
import { ArticleHero } from "@/components/article/ArticleHero";
import { Sidebar } from "@/components/layout/Sidebar";
import { getArticleBySlug, getTrendingArticles, getSavedArticleIds, getLikedArticleIds } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found | 3AM SCROLL",
        };
    }

    return {
        title: `${article.title} | 3AM SCROLL`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `https://3amscroll.com/article/${article.slug}`, // Replace with env var in prod
            siteName: '3AM SCROLL',
            images: [
                {
                    url: article.coverImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [article.coverImage],
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const [article, trendingArticles, savedArticleIds, likedArticleIds] = await Promise.all([
        getArticleBySlug(slug),
        getTrendingArticles(),
        user ? getSavedArticleIds(user.id) : Promise.resolve(new Set<string>()),
        user ? getLikedArticleIds(user.id) : Promise.resolve(new Set<string>())
    ]);

    if (!article) {
        notFound();
    }

    // Get related articles (same category, excluding current)
    const relatedArticles = mockArticles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Mobile Header */}

            {/* Hero Section */}
            <div className="h-[60vh] lg:h-[70vh]">
                <ArticleHero
                    article={article}
                    isSaved={savedArticleIds.has(article.id)}
                    isLiked={likedArticleIds.has(article.id)}
                />
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                        <ArticleContent article={article} />

                        {/* Related Articles */}
                        <RelatedArticles articles={relatedArticles} />
                    </div>

                    {/* Sidebar - Desktop Only */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Author Card */}
                            <AuthorCard
                                author={article.author.name}
                                authorId={article.author.id}
                                avatar={article.author.avatar}
                                bio={article.author.bio}
                                articlesCount={12}
                            />

                            {/* Trending Articles */}
                            <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                                    Trending Now
                                </h3>
                                <div className="space-y-4">
                                    {mockArticles.slice(0, 5).map((trendingArticle, index) => (
                                        <a
                                            key={trendingArticle.id}
                                            href={`/article/${trendingArticle.slug}`}
                                            className="block group"
                                        >
                                            <div className="flex gap-3">
                                                <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {trendingArticle.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {trendingArticle.readTime} min read
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Engagement Bar - Sticky Bottom */}
            <EngagementBar
                likes={article.likes}
                comments={article.comments}
            />

            {/* Footer */}
            <Footer />
        </div>
    );
}

import { notFound } from "next/navigation";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { ArticleContent } from "@/components/article/ArticleContent";
import { AuthorCard } from "@/components/article/AuthorCard";
import { EngagementBar } from "@/components/article/EngagementBar";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { mockArticles } from "@/lib/mock-data";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    // Find the article by slug
    const article = mockArticles.find((a) => a.slug === slug);

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
            <MobileHeader />

            {/* Desktop Header */}
            <DesktopHeader />

            {/* Hero Image */}
            <div className="relative h-[300px] md:h-[500px] bg-gray-200 dark:bg-gray-800 mt-16 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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

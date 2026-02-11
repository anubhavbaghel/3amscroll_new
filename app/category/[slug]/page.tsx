import { notFound } from "next/navigation";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { CategoryHeader } from "@/components/category/CategoryHeader";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ArticleCardDesktop } from "@/components/article/ArticleCardDesktop";
import { mockArticles, getCategory } from "@/lib/mock-data";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    // Get category details
    const category = getCategory(slug);

    if (!category) {
        notFound();
    }

    // Filter articles by category
    const categoryArticles = mockArticles.filter(
        (article) => article.category.toLowerCase() === category.name.toLowerCase()
    );

    const stats = {
        articlesCount: categoryArticles.length,
        authorsCount: new Set(categoryArticles.map(a => a.author.id)).size
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <MobileHeader />
            <DesktopHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 lg:mt-0">
                <CategoryHeader category={category} stats={stats} />

                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {categoryArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categoryArticles.map((article) => (
                                    <ArticleCardDesktop key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                                <p className="text-gray-500">
                                    We haven't published any articles in this category yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Reusing from Homepage/Article Page */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                                    About {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    {category.description}
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Total Articles</span>
                                        <span className="font-medium">{stats.articlesCount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Contributors</span>
                                        <span className="font-medium">{stats.authorsCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}

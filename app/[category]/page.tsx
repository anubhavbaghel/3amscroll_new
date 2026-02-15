import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getArticles } from "@/lib/data";
import { CategoryHeader } from "@/components/category/CategoryHeader";

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

// Function to capitalize category name properly
const formatCategory = (slug: string) => {
    return slug.charAt(0).toUpperCase() + slug.slice(1);
};

export async function generateMetadata({ params }: CategoryPageProps) {
    const { category } = await params;
    const categoryName = formatCategory(category);

    return {
        title: `${categoryName} News & Articles | 3AM SCROLL`,
        description: `Latest ${categoryName} updates, stories, and insights.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const allArticles = await getArticles();

    // Filter articles by category (case-insensitive)
    const categoryArticles = allArticles.filter(
        article => article.category.toLowerCase() === category.toLowerCase()
    );

    const validCategories = ['tech', 'gaming', 'finance', 'lifestyle', 'travel', 'creative', 'world', 'career', 'entertainment'];

    // Allow any category that has articles, OR is in our valid list (even if empty)
    if (categoryArticles.length === 0 && !validCategories.includes(category.toLowerCase())) {
        notFound();
    }

    const categoryName = formatCategory(category);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <CategoryHeader category={categoryName} count={categoryArticles.length} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">
                {categoryArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm">
                        <p className="text-xl text-gray-500">No articles found in this category yet.</p>
                        <p className="text-sm text-gray-400 mt-2">Check back later for updates.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

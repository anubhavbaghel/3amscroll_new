import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getArticles } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

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

    if (categoryArticles.length === 0) {
        // Option: return notFound() if we want strict 404s
        // Or just show an empty state. Let's show empty state but keep page.
        // If it's a completely invalid route (like /jklsdf), maybe 404 is better.
        // Check if category is one of our known categories?
        const validCategories = ['tech', 'gaming', 'finance', 'lifestyle', 'travel', 'creative', 'world', 'career', 'entertainment'];
        if (!validCategories.includes(category.toLowerCase())) {
            notFound();
        }
    }

    const categoryName = formatCategory(category);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        {categoryName}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Explore the latest stories in {categoryName}.
                    </p>
                </div>

                {categoryArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No articles found in this category yet.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

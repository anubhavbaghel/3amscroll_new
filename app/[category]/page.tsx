import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getArticles } from "@/lib/data";
import { CategoryHeader } from "@/components/category/CategoryHeader";
import { Metadata } from "next";
import { siteConfig, Category } from "@/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseUrl } from "@/app/sitemap";

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

// Helper to get category name from slug or format it
const getCategoryName = (slug: string) => {
    const category = siteConfig.categories.find(c => c.slug === slug);
    if (category) return category.name;
    // Fallback: capitalize and remove dashes
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const categoryName = getCategoryName(category);

    return {
        title: `${categoryName} News & Articles`,
        description: `Explore the latest ${categoryName.toLowerCase()} updates, stories, and insights curated for Gen Z. Stay informed with trending ${categoryName.toLowerCase()} content on 3AM SCROLL.`,
        openGraph: {
            title: `${categoryName} News & Articles | 3AM SCROLL`,
            description: `Latest ${categoryName.toLowerCase()} updates, stories, and insights for Gen Z.`,
            url: `https://3amscroll.com/${category}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${categoryName} News & Articles | 3AM SCROLL`,
            description: `Latest ${categoryName.toLowerCase()} updates, stories, and insights for Gen Z.`,
        },
        alternates: {
            canonical: `https://3amscroll.com/${category}`,
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const allArticles = await getArticles();

    // Filter articles by category (case-insensitive)
    const categoryArticles = allArticles.filter(
        article => article.category.toLowerCase() === category.toLowerCase()
    );

    const validCategories = siteConfig.categories.map((cat: Category) => cat.slug) as string[];

    // Allow any category that has articles, OR is in our valid list (even if empty)
    if (categoryArticles.length === 0 && !validCategories.includes(category.toLowerCase())) {
        notFound();
    }

    const categoryName = getCategoryName(category);

    const breadcrumbItems = [
        { name: categoryName, item: `${baseUrl}/${category}` }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <CategoryHeader
                category={categoryName}
                count={categoryArticles.length}
                featuredArticle={categoryArticles[0]}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">
                <Breadcrumbs
                    items={[
                        { label: categoryName, href: `/${category}`, active: true }
                    ]}
                />
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

import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { ArticleCardDesktop } from "@/components/article/ArticleCardDesktop";
import { ArticleCard } from "@/components/article/ArticleCard";
import { mockArticles } from "@/lib/mock-data";
import { Search } from "lucide-react";

interface SearchPageProps {
    searchParams: Promise<{
        q: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q || "";

    // Filter articles
    const results = mockArticles.filter((article) => {
        const searchContent = `${article.title} ${article.excerpt} ${article.category} ${article.author.name}`.toLowerCase();
        return searchContent.includes(query.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <MobileHeader />
            <DesktopHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 lg:mt-0">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Search Results</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Found {results.length} results for "{query}"
                        </p>
                    </div>
                </div>

                {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((article) => (
                            <div key={article.id}>
                                {/* Show desktop card on all screens for consistent grid */}
                                <ArticleCardDesktop article={article} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                        <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No results found</h2>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            We used "exact match" searching. Try searching for "Tech", "AI", or "Guide".
                        </p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

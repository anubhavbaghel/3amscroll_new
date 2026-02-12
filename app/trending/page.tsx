import { Footer } from "@/components/layout/Footer";
import { TrendingHero } from "@/components/trending/TrendingHero";
import { TrendingList } from "@/components/trending/TrendingList";
import { mockArticles } from "@/lib/mock-data";

export default function TrendingPage() {
    // Sort articles by views/popularity
    const sortedArticles = [...mockArticles].sort((a, b) => (b.views || 0) - (a.views || 0));

    // Top 3 for Hero
    const topArticles = sortedArticles.slice(0, 3);

    // Rest for List
    const listArticles = sortedArticles.slice(3);

    return (
        <div className="min-h-screen bg-white dark:bg-black">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 lg:mt-0">
                <TrendingHero articles={topArticles} />

                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0 max-w-4xl mx-auto">
                        <TrendingList articles={listArticles} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

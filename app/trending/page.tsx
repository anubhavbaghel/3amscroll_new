import { Footer } from "@/components/layout/Footer";
import { TrendingHero } from "@/components/trending/TrendingHero";
import { TrendingGrid } from "@/components/trending/TrendingGrid";
import { TrendingTicker } from "@/components/trending/TrendingTicker";
import { getTrendingArticles, getArticles } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trending Stories",
    description: "Discover the most deeply read and wildly shared Gen-Z stories on 3AM SCROLL right now. Join the late-night conversation.",
    alternates: {
        canonical: "https://3amscroll.com/trending",
    },
    openGraph: {
        title: "Trending | 3AM SCROLL",
        description: "Discover the most deeply read and wildly shared Gen-Z stories right now.",
        url: "https://3amscroll.com/trending",
    },
};

export default async function TrendingPage() {
    // Fetch real data from DB
    const [trendingArticles, allArticles] = await Promise.all([
        getTrendingArticles(),
        getArticles()
    ]);

    // Sort or use trendingArticles directly
    const sortedArticles = trendingArticles.length > 0 ? trendingArticles : allArticles;

    // Top 3 for Hero
    const topArticles = sortedArticles.slice(0, 3);

    // Rest for List
    const listArticles = sortedArticles.slice(3);


    return (
        <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
            {/* Ticker Section - Mobile needs padding for fixed header, Desktop is sticky so no padding needed */}
            <div className="pt-32 lg:pt-0">
                <TrendingTicker />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-16 pt-8">
                <h1 className="sr-only">Trending Stories and Articles</h1>
                <TrendingHero articles={topArticles} />

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    <TrendingGrid articles={listArticles} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

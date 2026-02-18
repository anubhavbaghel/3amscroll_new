import dynamic from "next/dynamic";
import { getArticles } from "@/lib/data";
import { Footer } from "@/components/layout/Footer";

const SearchPageContent = dynamic(
    () => import("@/components/search/SearchPageContent").then((mod) => mod.SearchPageContent),
    { ssr: false, loading: () => <div className="min-h-screen pt-44 flex justify-center animate-pulse"><div className="w-full max-w-4xl h-20 bg-gray-100 dark:bg-gray-900 rounded-3xl mx-4" /></div> }
);

export const metadata = {
    title: "Search | 3AM SCROLL",
    description: "Search for stories, authors, and topics.",
};

export default async function SearchPage() {
    // Fetch articles on the server to pass as initial data
    // In a real app with large data, we would use a search API (Algolia, Supabase Text Search)
    const allArticles = await getArticles();

    return (
        <>
            <SearchPageContent initialArticles={allArticles} />
            <Footer />
        </>
    );
}

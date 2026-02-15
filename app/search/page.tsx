import { SearchPageContent } from "@/components/search/SearchPageContent";
import { getArticles } from "@/lib/data";
import { Footer } from "@/components/layout/Footer";

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

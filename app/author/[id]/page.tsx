import { notFound } from "next/navigation";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { ArticleCardDesktop } from "@/components/article/ArticleCardDesktop";
import { AuthorProfileHeader } from "@/components/author/AuthorProfileHeader";
import { getAuthor, getAuthorArticles } from "@/lib/mock-data";

interface AuthorPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const { id } = await params;
    const author = getAuthor(id);

    if (!author) {
        notFound();
    }

    const articles = getAuthorArticles(id);

    const stats = {
        articles: articles.length,
        views: articles.reduce((acc, curr) => acc + (curr.views || 0), 0),
        likes: articles.reduce((acc, curr) => acc + (curr.likes || 0), 0),
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <MobileHeader />
            <DesktopHeader />

            <main>
                <AuthorProfileHeader author={author} stats={stats} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <ArticleCardDesktop key={article.id} article={article} />
                        ))}
                    </div>

                    {articles.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                            <p className="text-gray-500">No articles published yet.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

import { getArticle } from "../../../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Article</h1>
                    <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                <ArticleForm mode="edit" initialData={article} />
            </div>
        </div>
    );
}

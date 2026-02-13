import { getArticle } from "../../../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";

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

                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Danger Zone</h3>
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 mb-4">
                            Once you delete an article, there is no going back. Please be certain.
                        </p>
                        <DeleteArticleButton id={article.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

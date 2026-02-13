import Link from "next/link";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Article</h1>
                    <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                <ArticleForm mode="create" />
            </div>
        </div>
    );
}

import { createClient } from "@/lib/supabase/server";
import { WriteArticleForm } from "@/components/write/WriteArticleForm";
import { redirect, notFound } from "next/navigation";

interface EditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPage({ params }: EditPageProps) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch article
    const { data: article } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (!article) {
        notFound();
    }

    // Check ownership
    if (article.author_uuid !== user.id) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p className="text-gray-600">You don't have permission to edit this article.</p>
                </div>
            </div>
        );
    }

    const initialData = {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.cover_image,
        category: article.category,
        status: article.status,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <main className="max-w-3xl mx-auto px-4 py-8 lg:py-12 pb-24 lg:pb-12 pt-32">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Edit Article</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Update your article content
                    </p>
                </div>

                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                    <WriteArticleForm initialData={initialData} />
                </div>
            </main>
        </div>
    );
}

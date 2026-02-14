import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WriteArticleForm } from "@/components/write/WriteArticleForm";

export const metadata: Metadata = {
    title: "Write Article | 3AM SCROLL",
    description: "Share your story with the world",
};

export default async function WritePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?redirect=/write");
    }

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display mb-2">Write Your Story</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Share your thoughts, ideas, and experiences with the community
                    </p>
                </div>

                <WriteArticleForm />
            </div>
        </div>
    );
}

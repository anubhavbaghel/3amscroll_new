import { WriteArticleForm } from "@/components/write/WriteArticleForm";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function WritePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <main className="max-w-3xl mx-auto px-4 py-8 lg:py-12 pb-24 lg:pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Write Article</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Share your thoughts with the world.
                    </p>
                </div>

                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                    <WriteArticleForm />
                </div>
            </main>
        </div>
    );
}

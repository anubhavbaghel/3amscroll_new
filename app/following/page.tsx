
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { routes } from "@/config/routes";

export default async function FollowingPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <main className="max-w-3xl mx-auto px-4 py-8 lg:py-12 pb-24 lg:pb-12">
                <div className="mb-8 text-center py-20">
                    <h1 className="text-3xl font-bold mb-4">Following Feed</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        See stories from people you follow. <br />
                        (This feature is coming soon!)
                    </p>
                    <Link
                        href={routes.home}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand hover:bg-brand-dark transition-colors"
                    >
                        Browse Trending
                    </Link>
                </div>
            </main>
        </div>
    );
}

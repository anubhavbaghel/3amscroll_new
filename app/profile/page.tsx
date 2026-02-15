import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/app/actions/profile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import Link from "next/link";
import { ArticleCardDesktop } from "@/components/article/ArticleCardDesktop";
import { User, Article } from "@/types";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
        redirect("/login?redirectTo=/profile");
    }

    // specific profile fetch (ensures we get latest metadata)
    const profileData = await getProfile(authUser.id);

    if (!profileData) {
        // Fallback if profile doesn't exist yet (shouldn't happen with triggers, but safe)
        return <div>Profile not found</div>;
    }

    // Cast to User type
    const user: User = {
        id: profileData.id,
        email: profileData.email,
        name: profileData.username || profileData.email.split('@')[0], // Fallback name
        username: profileData.username,
        avatar: profileData.avatar_url,
        banner: profileData.banner_url,
        bio: profileData.bio,
        website: profileData.website,
        location: profileData.location,
        social_links: profileData.social_links,
        role: "user", // Default, though we could fetch from DB
        savedArticles: [], // We'll implementations saved later
        preferences: {
            categories: [],
            notifications: false,
            theme: "system"
        },
        joinedAt: profileData.updated_at // Using updated_at or created_at if available
    };

    // Fetch User Articles
    const { data: articles } = await supabase
        .from("articles")
        .select("*")
        .eq("author_uuid", authUser.id)
        .order("published_at", { ascending: false });

    return (
        <main className="min-h-screen pb-20 bg-white dark:bg-black">
            <ProfileHeader user={user} isOwnProfile={true} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 dark:border-dark-border pb-4">
                    <h2 className="text-2xl font-bold font-display">My Stories</h2>
                    <span className="text-sm text-gray-500">{articles?.length || 0} Published</span>
                </div>

                {articles && articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <ArticleCardDesktop key={article.id} article={article as Article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No stories yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                            You haven&apos;t published any articles yet. Share your thoughts with the world!
                        </p>
                        <Link
                            href="/write"
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-full font-medium transition-all shadow-lg shadow-brand/20"
                        >
                            Write your first story
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

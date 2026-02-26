import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/app/actions/profile";
import { SettingsContent } from "@/components/settings/SettingsContent";
import { User } from "@/types";

export const metadata = {
    title: "Settings | 3AM SCROLL",
    description: "Manage your account settings and preferences.",
    robots: {
        index: false,
        follow: false,
    }
};

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const authUser = data?.user;

    if (!authUser) {
        redirect("/login?redirectTo=/settings");
    }

    const profileData = await getProfile(authUser.id);

    // Cast to User type (similar to profile page)
    const user: User = {
        id: authUser.id,
        email: authUser.email || "",
        name: profileData?.name || authUser.user_metadata.full_name || authUser.email?.split('@')[0] || "User",
        username: profileData?.username,
        avatar: profileData?.avatar_url,
        banner: profileData?.banner_url,
        bio: profileData?.bio,
        website: profileData?.website,
        location: profileData?.location,
        social_links: profileData?.social_links,
        role: "user",
        savedArticles: [],
        preferences: {
            categories: [],
            notifications: false,
            theme: "system"
        },
        joinedAt: profileData?.updated_at || new Date().toISOString()
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-20 pb-24">
            <SettingsContent user={user} />
        </div>
    );
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProfile(userId: string) {
    const supabase = await createClient();

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    return profile;
}

export async function updateProfile(_prevState: unknown, formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Not authenticated" };
    }

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const website = formData.get("website") as string;
    const location = formData.get("location") as string;
    const username = formData.get("username") as string;

    // Social links
    const social_links = {
        twitter: formData.get("twitter") as string,
        instagram: formData.get("instagram") as string,
        linkedin: formData.get("linkedin") as string,
        github: formData.get("github") as string,
    };

    const updates = {
        username,
        bio,
        website,
        location,
        social_links,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

    if (error) {
        console.error("Error updating profile:", error);
        return { error: "Failed to update profile" };
    }

    // Sync important fields to Auth Metadata (for Header/Session access)
    const { error: authUpdateError } = await supabase.auth.updateUser({
        data: {
            full_name: name || user.user_metadata.full_name, // fallback to existing
            name: name || user.user_metadata.name,
            avatar_url: undefined, // specific image upload action handles this usually, but we can add logic if needed
            // We generally don't sync bio/etc to auth metadata to keep the JWT small, 
            // but name and avatar are critical for the Header.
        }
    });

    if (authUpdateError) {
        console.error("Error syncing auth metadata:", authUpdateError);
        // We don't fail the request here as the DB update succeeded
    }

    revalidatePath("/profile");
    return { success: true };
}

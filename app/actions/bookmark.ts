"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleBookmark(articleId: string) {
    const supabase = await createClient();

    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to save articles." };
    }

    // Check if already bookmarked
    const { data: existing } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("article_id", articleId)
        .single();

    if (existing) {
        // Remove bookmark
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", existing.id);

        if (error) return { error: "Failed to remove bookmark." };
    } else {
        // Add bookmark
        const { error } = await supabase
            .from("bookmarks")
            .insert({
                user_id: user.id,
                article_id: articleId,
            });

        if (error) return { error: "Failed to save article." };
    }

    // Revalidate paths to update UI
    revalidatePath("/");
    revalidatePath("/saved");
    revalidatePath(`/article/${articleId}`); // If we are on article page
    return { success: true, isBookmarked: !existing };
}

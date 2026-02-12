"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(articleId: string) {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to like articles." };
    }

    // Check if already liked
    const { data: existing } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("article_id", articleId)
        .single();

    if (existing) {
        // UNLIKE
        const { error: deleteError } = await supabase
            .from("likes")
            .delete()
            .eq("id", existing.id);

        if (deleteError) return { error: "Failed to unlike." };

        // Decrement count (optimistic, but we should do it in DB)
        // Note: For accuracy, we should use RPC, but simple update is okay for now
        await supabase.rpc('decrement_likes', { article_id_param: articleId }); // We need to create this RPC or just use update logic

        // Fallback if RPC doesn't exist (simpler for user)
        const { data: article } = await supabase.from("articles").select("likes_count").eq("id", articleId).single();
        if (article) {
            await supabase.from("articles").update({ likes_count: Math.max(0, article.likes_count - 1) }).eq("id", articleId);
        }

    } else {
        // LIKE
        const { error: insertError } = await supabase
            .from("likes")
            .insert({ user_id: user.id, article_id: articleId });

        if (insertError) return { error: "Failed to like." };

        // Increment count
        const { data: article } = await supabase.from("articles").select("likes_count").eq("id", articleId).single();
        if (article) {
            await supabase.from("articles").update({ likes_count: article.likes_count + 1 }).eq("id", articleId);
        }
    }

    revalidatePath("/");
    revalidatePath(`/article/${articleId}`);
    return { success: true, isLiked: !existing };
}

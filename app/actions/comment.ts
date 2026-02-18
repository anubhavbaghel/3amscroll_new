"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createComment(articleId: string, content: string) {
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: "You must be logged in to comment." };
    }

    // Validate content
    if (!content || content.trim().length === 0) {
        return { error: "Comment cannot be empty." };
    }

    if (content.length > 1000) {
        return { error: "Comment is too long (max 1000 characters)." };
    }

    // Insert comment
    const { data: comment, error } = await supabase
        .from("comments")
        .insert({
            article_id: articleId,
            user_id: user.id,
            content: content.trim()
        })
        .select(`
            *,
            user:profiles!comments_user_id_fkey(name, avatar)
        `)
        .single();

    if (error) {
        console.error("Error creating comment:", error);
        return { error: "Failed to post comment. Please try again." };
    }

    // Revalidate paths
    revalidatePath(`/article/${articleId}`);
    revalidatePath("/");

    return { success: true, comment };
}

export async function deleteComment(commentId: string) {
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: "You must be logged in." };
    }

    // Delete comment (RLS will ensure user owns it or is admin)
    const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

    if (error) {
        console.error("Error deleting comment:", error);
        return { error: "Failed to delete comment." };
    }

    // Revalidate paths
    revalidatePath("/");

    return { success: true };
}

export async function getComments(articleId: string) {
    const supabase = await createClient();

    const { data: comments, error } = await supabase
        .from("comments")
        .select(`
            *,
            user:profiles!comments_user_id_fkey(name, avatar)
        `)
        .eq("article_id", articleId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching comments:", error);
        return { error: "Failed to load comments.", comments: [] };
    }

    return { comments: comments || [] };
}

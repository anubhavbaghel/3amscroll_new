"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { submitToIndexNow } from "@/lib/indexnow";

async function isAdmin(supabase: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    return profile?.role === 'admin';
}

export async function createArticle(formData: FormData) {
    const supabase = await createClient();

    // Get current user to set as author
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (!user || !(await isAdmin(supabase))) {
        throw new Error("Unauthorized: Admin access required");
    }

    const title = formData.get("title") as string;
    const slugRaw = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;
    const status = formData.get("status") as string;

    // SEO Fields
    const seo_title = formData.get("seo_title") as string;
    const seo_description = formData.get("seo_description") as string;
    const focus_keyword = formData.get("focus_keyword") as string;
    const cover_image_alt = formData.get("cover_image_alt") as string;

    const formattedSlug = slugRaw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const authorName = user.user_metadata.full_name || user.email?.split("@")[0] || "Anonymous";
    const authorAvatar = user.user_metadata.avatar_url || "";

    // Calculate read time
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const { error } = await supabase.from("articles").insert({
        title,
        slug: formattedSlug,
        category,
        excerpt,
        content,
        cover_image,
        status,
        seo_title,
        seo_description,
        focus_keyword,
        cover_image_alt,
        author_id: user.id,
        author_name: authorName,
        author_avatar: authorAvatar,
        author_uuid: user.id,
        created_by: user.id,
        read_time: readTime,
        published_at: status === 'published' ? new Date().toISOString() : null
    });

    if (error) {
        console.error("Error creating article:", error);
        throw new Error(`Could not create article: ${error.message}`);
    }

    revalidatePath("/admin");
    revalidatePath("/");

    // Ping IndexNow if published
    if (status === 'published') {
        submitToIndexNow([`https://3amscroll.com/article/${formattedSlug}`]);
    }

    return { success: true };
}

export async function getArticle(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) return null;
    return data;
}

export async function updateArticle(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;

    if (!(await isAdmin(supabase))) {
        throw new Error("Unauthorized: Admin access required");
    }

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const cover_image = formData.get("cover_image") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string;

    // SEO Fields
    const seo_title = formData.get("seo_title") as string;
    const seo_description = formData.get("seo_description") as string;
    const focus_keyword = formData.get("focus_keyword") as string;
    const cover_image_alt = formData.get("cover_image_alt") as string;

    // Calculate read time
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const { error } = await supabase
        .from("articles")
        .update({
            title,
            slug,
            category,
            excerpt,
            cover_image,
            content,
            status,
            seo_title,
            seo_description,
            focus_keyword,
            cover_image_alt,
            read_time: readTime,
        })
        .eq("id", id);

    if (error) {
        console.error("Supabase Update Error [Article ID:", id, "]:", error.message, error.details, error.hint);
        throw new Error(`Failed to update article: ${error.message}`);
    }

    revalidatePath("/admin");
    revalidatePath(`/article/${slug}`);

    // Ping IndexNow if published
    if (status === 'published') {
        submitToIndexNow([`https://3amscroll.com/article/${slug}`]);
    }

    return { success: true };
}

export async function deleteArticle(id: string) {
    const supabase = await createClient();

    // Auth check
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;
    if (!user || !(await isAdmin(supabase))) {
        throw new Error("Unauthorized: Admin access required");
    }

    const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting article:", error.message, error.details, error.hint);
        throw new Error(`Failed to delete article: ${error.message}`);
    }

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
}

export async function updateArticleStatus(id: string, status: string) {
    const supabase = await createClient();

    // Auth check
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user || !(await isAdmin(supabase))) {
        throw new Error("Unauthorized: Admin access required");
    }

    const { error } = await supabase
        .from("articles")
        .update({
            status,
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating article status:", error);
        throw new Error(`Failed to update status: ${error.message}`);
    }

    revalidatePath("/admin");
    revalidatePath("/");

    // Ping IndexNow if published
    if (status === 'published') {
        const { data: article } = await supabase.from("articles").select("slug").eq("id", id).single();
        if (article?.slug) {
            submitToIndexNow([`https://3amscroll.com/article/${article.slug}`]);
        }
    }

    return { success: true };
}

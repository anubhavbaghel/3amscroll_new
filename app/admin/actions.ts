"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
    const supabase = await createClient();

    // Get current user to set as author
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;
    const status = formData.get("status") as string;

    const { error } = await supabase.from("articles").insert({
        title,
        slug,
        category,
        excerpt,
        content,
        cover_image,
        status,
        author_id: user.id,
        published_at: status === 'published' ? new Date().toISOString() : null
    });

    if (error) {
        console.error("Error creating article:", error);
        return redirect("/admin/articles/new?error=Could not create article. Slug might be duplicate.");
    }

    revalidatePath("/admin");
    revalidatePath("/");
    redirect("/admin");
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
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const cover_image = formData.get("cover_image") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string;

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
            updated_at: new Date().toISOString(),
        })
        .eq("id", id);

    if (error) {
        // We can't redirect with error parameter easily if we are calling this from a form
        // But let's assume standard error handling
        console.error("Error updating article:", error);
        return;
    }

    revalidatePath("/admin");
    revalidatePath(`/article/${slug}`);
    redirect("/admin");
}

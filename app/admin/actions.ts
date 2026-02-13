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
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;
    const status = formData.get("status") as string;

    const { error } = await supabase.from("articles").insert({
        title,
        slug,
        category,
        summary,
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

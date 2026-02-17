import { createClient, createPublicClient } from "@/lib/supabase/server";
import { Article, Author } from "@/types";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// Helper to fetch author profile
async function getAuthorProfile(authorUuid: string) {
    const supabase = createPublicClient();
    const { data } = await supabase
        .from("profiles")
        .select("name, avatar, bio")
        .eq("id", authorUuid)
        .single();

    return data;
}

// Helper to map DB result to our App Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDBArticleToAppArticle = async (dbArticle: any): Promise<Article> => {
    // Fetch author profile if we have author_uuid
    let authorProfile = null;
    if (dbArticle.author_uuid) {
        authorProfile = await getAuthorProfile(dbArticle.author_uuid);
    }

    return {
        id: dbArticle.id,
        slug: dbArticle.slug,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        content: dbArticle.content,
        coverImage: dbArticle.cover_image,
        category: dbArticle.category,
        author: {
            id: dbArticle.author_uuid || dbArticle.author_id,
            name: authorProfile?.name || dbArticle.author_name || "Unknown Author",
            avatar: authorProfile?.avatar || dbArticle.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorProfile?.name || dbArticle.author_name || "User")}&background=random`,
            bio: authorProfile?.bio || "",
        },
        publishedAt: dbArticle.published_at,
        readTime: dbArticle.read_time || Math.ceil((dbArticle.content?.split(/\s+/).length || 0) / 200) || 5,
        views: dbArticle.views,
        likes: dbArticle.likes_count || 0,
        comments: 0,
        tags: [], // Placeholder
    };
};

export const getArticles = unstable_cache(
    async (): Promise<Article[]> => {
        const supabase = createPublicClient();

        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .eq("status", "published")
            .order("published_at", { ascending: false });

        if (error) {
            console.error("Error fetching articles:", error);
            return [];
        }

        return await Promise.all((data || []).map(mapDBArticleToAppArticle));
    },
    ["all-articles"],
    { revalidate: 60, tags: ["articles"] }
);

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    if (error) {
        console.error(`Error fetching article ${slug}:`, error);
        return null;
    }

    return await mapDBArticleToAppArticle(data);
});

export const getTrendingArticles = unstable_cache(
    async (): Promise<Article[]> => {
        const supabase = createPublicClient();

        // Sort by views + likes (simple popularity metric)
        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .eq("status", "published")
            .order("views", { ascending: false })
            .limit(5);

        if (error) {
            console.error("Error fetching trending articles:", error);
            return [];
        }

        return await Promise.all((data || []).map(mapDBArticleToAppArticle));
    },
    ["trending-articles"],
    { revalidate: 60, tags: ["trending"] }
);

// TODO: Implement getAuthor(id) properly when we reference real "Profiles" table
// For now, since articles store author info directly (denormalized in mock migration),
// we can just fetch articles by author_id to reconstruct the author page.
export async function getAuthorArticles(authorId: string): Promise<Article[]> {
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("author_uuid", authorId)
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) {
        console.error(`Error fetching articles for author ${authorId}:`, error);
        return [];
    }

    return await Promise.all((data || []).map(mapDBArticleToAppArticle));
}

export async function getAuthor(authorId: string): Promise<Author | null> {
    // Fetch author from profiles table
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authorId)
        .single();

    if (error || !data) {
        console.error(`Error fetching author ${authorId}:`, error);
        return null;
    }

    return {
        id: data.id,
        name: data.name || "Unknown Author",
        avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || "User")}&background=random`,
        bio: data.bio || "",
    };
}

export async function getSavedArticleIds(userId: string): Promise<Set<string>> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("bookmarks")
        .select("article_id")
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching saved articles:", error);
        return new Set();
    }

    return new Set(data.map((item: { article_id: string }) => item.article_id));
}

export async function getLikedArticleIds(userId: string): Promise<Set<string>> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("likes")
        .select("article_id")
        .eq("user_id", userId);

    if (error) {
        return new Set();
    }

    return new Set(data.map((item: { article_id: string }) => item.article_id));
}

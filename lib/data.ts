import { createClient, createPublicClient } from "@/lib/supabase/server";
import { Article, Author } from "@/types";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// Helper to batch fetch author profiles
async function batchFetchAuthorProfiles(authorUuids: string[]) {
    const validUuids = authorUuids.filter(Boolean);
    if (validUuids.length === 0) return new Map();

    const supabase = createPublicClient();
    const { data } = await supabase
        .from("profiles")
        .select("id, name, avatar, bio")
        .in("id", validUuids);

    // Create a map for quick lookup
    const profileMap = new Map();
    (data || []).forEach(profile => {
        profileMap.set(profile.id, profile);
    });

    return profileMap;
}

// Helper to map DB result to our App Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDBArticleToAppArticle = (dbArticle: any, profileMap: Map<string, any>): Article => {
    const authorId = dbArticle.author_uuid || dbArticle.author_id;
    const authorProfile = authorId ? profileMap.get(authorId) : null;

    return {
        id: dbArticle.id,
        slug: dbArticle.slug,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        content: dbArticle.content,
        coverImage: dbArticle.cover_image,
        category: dbArticle.category,
        author: {
            id: authorId || "unknown",
            name: "3AM SCROLL Team",
            avatar: "/icon-512.png",
            bio: "Curating the internet's noise into signals for the sleepless generation.",
        },
        publishedAt: dbArticle.published_at,
        readTime: dbArticle.read_time || Math.ceil((dbArticle.content?.split(/\s+/).length || 0) / 200) || 5,
        views: dbArticle.views,
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

        if (!data || data.length === 0) return [];

        // Batch fetch all author profiles
        const authorUuids = [...new Set(data.map(a => a.author_uuid).filter(Boolean))];
        const profileMap = await batchFetchAuthorProfiles(authorUuids);

        return data.map(article => mapDBArticleToAppArticle(article, profileMap));
    },
    ["all-articles"],
    { revalidate: 60, tags: ["articles"] }
);

const getCachedArticleBySlug = (slug: string) => unstable_cache(
    async (slug: string) => {
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

        const profileMap = await batchFetchAuthorProfiles(data.author_uuid ? [data.author_uuid] : []);
        return mapDBArticleToAppArticle(data, profileMap);
    },
    ["article-by-slug", slug],
    { revalidate: 60, tags: ["articles"] }
)(slug);

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    return getCachedArticleBySlug(slug);
}

export const getTrendingArticles = unstable_cache(
    async (): Promise<Article[]> => {
        const supabase = createPublicClient();
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

        if (!data || data.length === 0) return [];

        const authorUuids = [...new Set(data.map(a => a.author_uuid).filter(Boolean))];
        const profileMap = await batchFetchAuthorProfiles(authorUuids);
        return data.map(article => mapDBArticleToAppArticle(article, profileMap));
    },
    ["trending-articles"],
    { revalidate: 60, tags: ["trending"] }
);

const getCachedAuthorArticles = (authorId: string) => unstable_cache(
    async (authorId: string) => {
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

        if (!data || data.length === 0) return [];

        const authorUuids = [...new Set(data.map(a => a.author_uuid).filter(Boolean))];
        const profileMap = await batchFetchAuthorProfiles(authorUuids);
        return data.map(article => mapDBArticleToAppArticle(article, profileMap));
    },
    ["author-articles", authorId],
    { revalidate: 60, tags: ["articles", "authors"] }
)(authorId);

export async function getAuthorArticles(authorId: string): Promise<Article[]> {
    return getCachedAuthorArticles(authorId);
}

const getCachedAuthor = (authorId: string) => unstable_cache(
    async (authorId: string) => {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authorId)
            .single();

        if (error) {
            if (error.code !== 'PGRST116') {
                console.error(`Error fetching author ${authorId}:`, error);
            }
            return null;
        }

        return {
            id: data.id,
            name: "3AM SCROLL Team",
            avatar: "/icon-512.png",
            bio: "Curating the internet's noise into signals for the sleepless generation.",
        };
    },
    ["author-profile", authorId],
    { revalidate: 60, tags: ["authors"] }
)(authorId);

export async function getAuthor(authorId: string): Promise<Author | null> {
    return getCachedAuthor(authorId);
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


const getCachedRelatedArticles = (categoryString: string | undefined, excludeId: string) => unstable_cache(
    async (categoryString: string | undefined, excludeId: string) => {
        const categories = categoryString ? categoryString.split(',').map(c => c.trim()).filter(Boolean) : [];
        if (categories.length === 0) return [];

        const supabase = createPublicClient();

        // Build an OR query that checks if the article's category column 
        // contains ANY of the categories from the current article.
        // e.g., category.ilike.%Tech%,category.ilike.%Gaming%
        const orConditions = categories.map(cat => `category.ilike.%${cat}%`).join(',');

        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .eq("status", "published")
            .neq("id", excludeId)
            .or(orConditions)
            .order("published_at", { ascending: false })
            .limit(3);

        if (error) {
            console.error("Error fetching related articles:", error);
            return [];
        }

        if (!data || data.length === 0) return [];

        const authorUuids = [...new Set(data.map(a => a.author_uuid).filter(Boolean))];
        const profileMap = await batchFetchAuthorProfiles(authorUuids);
        return data.map(article => mapDBArticleToAppArticle(article, profileMap));
    },
    ["related-articles", categoryString || "", excludeId],
    { revalidate: 60, tags: ["articles"] }
)(categoryString, excludeId);

export async function getRelatedArticles(categoryString: string | undefined, excludeId: string): Promise<Article[]> {
    return getCachedRelatedArticles(categoryString, excludeId);
}



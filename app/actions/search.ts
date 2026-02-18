"use server";

import { createClient, createPublicClient } from "@/lib/supabase/server";

export async function searchArticles(query: string) {
    if (!query || query.trim().length === 0) {
        return { articles: [] };
    }

    const supabase = createPublicClient();

    // Use full-text search on title, excerpt, and content
    const { data: articles, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .order("published_at", { ascending: false })
        .limit(20);

    if (error) {
        console.error("Error searching articles:", error);
        return { error: "Failed to search articles.", articles: [] };
    }

    // Fetch author profiles for results
    if (articles && articles.length > 0) {
        const authorUuids = [...new Set(articles.map(a => a.author_uuid).filter(Boolean))];

        if (authorUuids.length > 0) {
            const { data: profiles } = await supabase
                .from("profiles")
                .select("id, name, avatar, bio")
                .in("id", authorUuids);

            const profileMap = new Map();
            (profiles || []).forEach(profile => {
                profileMap.set(profile.id, profile);
            });

            // Map articles with author data
            const mappedArticles = articles.map(article => {
                const profile = article.author_uuid ? profileMap.get(article.author_uuid) : null;
                return {
                    id: article.id,
                    slug: article.slug,
                    title: article.title,
                    excerpt: article.excerpt,
                    content: article.content,
                    coverImage: article.cover_image,
                    category: article.category,
                    author: {
                        id: article.author_uuid,
                        name: profile?.name || "Unknown Author",
                        avatar: profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || "User")}&background=random`,
                        bio: profile?.bio || "",
                    },
                    publishedAt: article.published_at,
                    readTime: article.read_time || 5,
                    views: article.views,
                    likes: article.likes_count || 0,
                    comments: article.comments_count || 0,
                    tags: [],
                };
            });

            return { articles: mappedArticles };
        }
    }

    return { articles: articles || [] };
}

export async function getArticlesByCategory(category: string) {
    const supabase = createPublicClient();

    const { data: articles, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .eq("category", category)
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Error fetching articles by category:", error);
        return { error: "Failed to fetch articles.", articles: [] };
    }

    // Fetch author profiles
    if (articles && articles.length > 0) {
        const authorUuids = [...new Set(articles.map(a => a.author_uuid).filter(Boolean))];

        if (authorUuids.length > 0) {
            const { data: profiles } = await supabase
                .from("profiles")
                .select("id, name, avatar, bio")
                .in("id", authorUuids);

            const profileMap = new Map();
            (profiles || []).forEach(profile => {
                profileMap.set(profile.id, profile);
            });

            const mappedArticles = articles.map(article => {
                const profile = article.author_uuid ? profileMap.get(article.author_uuid) : null;
                return {
                    id: article.id,
                    slug: article.slug,
                    title: article.title,
                    excerpt: article.excerpt,
                    content: article.content,
                    coverImage: article.cover_image,
                    category: article.category,
                    author: {
                        id: article.author_uuid,
                        name: profile?.name || "Unknown Author",
                        avatar: profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || "User")}&background=random`,
                        bio: profile?.bio || "",
                    },
                    publishedAt: article.published_at,
                    readTime: article.read_time || 5,
                    views: article.views,
                    likes: article.likes_count || 0,
                    comments: article.comments_count || 0,
                    tags: [],
                };
            });

            return { articles: mappedArticles };
        }
    }

    return { articles: articles || [] };
}

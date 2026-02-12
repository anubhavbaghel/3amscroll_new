import { createClient } from "@/lib/supabase/server";
import { Article, Author } from "@/types";

// Helper to map DB result to our App Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDBArticleToAppArticle = (dbArticle: any): Article => ({
    id: dbArticle.id,
    slug: dbArticle.slug,
    title: dbArticle.title,
    excerpt: dbArticle.excerpt,
    content: dbArticle.content,
    coverImage: dbArticle.cover_image,
    category: dbArticle.category,
    author: {
        id: dbArticle.author_id,
        name: dbArticle.author_name,
        avatar: dbArticle.author_avatar,
        bio: "", // Placeholder until we have real profiles
    },
    publishedAt: dbArticle.published_at,
    readTime: dbArticle.read_time,
    views: dbArticle.views,
    likes: dbArticle.likes_count || 0,
    comments: 0,
    tags: [], // Placeholder
});

export async function getArticles(): Promise<Article[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Error fetching articles:", error);
        return [];
    }

    return (data || []).map(mapDBArticleToAppArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error(`Error fetching article ${slug}:`, error);
        return null;
    }

    return mapDBArticleToAppArticle(data);
}

export async function getTrendingArticles(): Promise<Article[]> {
    const supabase = await createClient();

    // Sort by views + likes (simple popularity metric)
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("views", { ascending: false })
        .limit(5);

    if (error) {
        console.error("Error fetching trending articles:", error);
        return [];
    }

    return (data || []).map(mapDBArticleToAppArticle);
}

// TODO: Implement getAuthor(id) properly when we reference real "Profiles" table
// For now, since articles store author info directly (denormalized in mock migration),
// we can just fetch articles by author_id to reconstruct the author page.
export async function getAuthorArticles(authorId: string): Promise<Article[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("author_id", authorId)
        .order("published_at", { ascending: false });

    if (error) {
        console.error(`Error fetching articles for author ${authorId}:`, error);
        return [];
    }

    return (data || []).map(mapDBArticleToAppArticle);
}

export async function getAuthor(authorId: string): Promise<Author | null> {
    // Hack: Since we don't have a populated "Profiles" table for authors yet (only for users),
    // we'll try to find one article by this author and grab their details.
    // In production, authors should have a record in 'profiles'.
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("articles")
        .select("author_id, author_name, author_avatar")
        .eq("author_id", authorId)
        .limit(1)
        .single();

    if (error || !data) return null;

    return {
        id: data.author_id,
        name: data.author_name,
        avatar: data.author_avatar,
        bio: "",
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

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface CreateUserArticleData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    status: 'draft' | 'published';
}

interface ArticleValidationError {
    field: string;
    message: string;
}

// Content safety validation
function validateArticleContent(data: CreateUserArticleData): ArticleValidationError[] {
    const errors: ArticleValidationError[] = [];

    // Title validation
    if (!data.title || data.title.trim().length < 5) {
        errors.push({ field: 'title', message: 'Title must be at least 5 characters' });
    }
    if (data.title && data.title.length > 200) {
        errors.push({ field: 'title', message: 'Title must be less than 200 characters' });
    }

    // Content validation (minimum 100 words for published articles)
    if (data.status === 'published') {
        const wordCount = data.content.split(/\s+/).filter(word => word.length > 0).length;
        if (wordCount < 100) {
            errors.push({ field: 'content', message: 'Published articles must have at least 100 words' });
        }
    }

    // Excerpt validation
    if (!data.excerpt || data.excerpt.trim().length < 10) {
        errors.push({ field: 'excerpt', message: 'Excerpt must be at least 10 characters' });
    }

    // Cover image validation
    if (!data.coverImage) {
        errors.push({ field: 'coverImage', message: 'Cover image is required' });
    }

    // Category validation
    if (!data.category) {
        errors.push({ field: 'category', message: 'Category is required' });
    }

    // Basic spam detection (simple patterns)
    const spamPatterns = [
        /\b(buy now|click here|limited offer)\b/gi,
        /\b(viagra|cialis|pharmacy)\b/gi,
    ];

    const combinedText = `${data.title} ${data.excerpt} ${data.content}`.toLowerCase();
    for (const pattern of spamPatterns) {
        if (pattern.test(combinedText)) {
            errors.push({ field: 'content', message: 'Content contains prohibited patterns' });
            break;
        }
    }

    return errors;
}

export async function createUserArticle(data: CreateUserArticleData) {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return { error: "You must be logged in to create articles" };
        }

        // Validate content
        const validationErrors = validateArticleContent(data);
        if (validationErrors.length > 0) {
            return {
                error: "Validation failed",
                validationErrors
            };
        }

        // Rate limiting check (5 articles per day)
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const { count } = await supabase
            .from('articles')
            .select('*', { count: 'exact', head: true })
            .eq('author_uuid', user.id)
            .gte('created_at', oneDayAgo.toISOString());

        if (count && count >= 5) {
            return { error: "You have reached the daily limit of 5 articles. Please try again tomorrow." };
        }

        // Calculate read time (average 200 words per minute)
        const wordCount = data.content.split(/\s+/).filter(word => word.length > 0).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        // Create article
        const { data: article, error } = await supabase
            .from('articles')
            .insert({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                cover_image: data.coverImage,
                category: data.category,
                status: data.status,
                author_uuid: user.id,
                created_by: user.id,
                read_time: readTime,
                published_at: data.status === 'published' ? new Date().toISOString() : null,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating article:', error);
            return { error: "Failed to create article. Please try again." };
        }

        // Revalidate paths
        revalidatePath('/');
        revalidatePath('/my-articles');
        if (data.status === 'published') {
            revalidatePath(`/article/${data.slug}`);
        }

        return { success: true, article };
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error: "An unexpected error occurred" };
    }
}

export async function updateUserArticle(articleId: string, data: CreateUserArticleData) {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return { error: "You must be logged in to update articles" };
        }

        // Validate content
        const validationErrors = validateArticleContent(data);
        if (validationErrors.length > 0) {
            return {
                error: "Validation failed",
                validationErrors
            };
        }

        // Check ownership
        const { data: existingArticle } = await supabase
            .from('articles')
            .select('author_uuid')
            .eq('id', articleId)
            .single();

        if (!existingArticle || existingArticle.author_uuid !== user.id) {
            return { error: "You don't have permission to edit this article" };
        }

        // Calculate read time
        const wordCount = data.content.split(/\s+/).filter(word => word.length > 0).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        // Update article
        const { data: article, error } = await supabase
            .from('articles')
            .update({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                cover_image: data.coverImage,
                category: data.category,
                status: data.status,
                read_time: readTime,
                published_at: data.status === 'published' && !existingArticle ? new Date().toISOString() : undefined,
            })
            .eq('id', articleId)
            .select()
            .single();

        if (error) {
            console.error('Error updating article:', error);
            return { error: "Failed to update article" };
        }

        revalidatePath('/');
        revalidatePath('/my-articles');
        revalidatePath(`/article/${data.slug}`);

        return { success: true, article };
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error: "An unexpected error occurred" };
    }
}

export async function getUserArticles() {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return { error: "You must be logged in" };
        }

        const { data: articles, error } = await supabase
            .from('articles')
            .select(`
                *,
                author:profiles!articles_author_uuid_fkey(name, avatar)
            `)
            .eq('author_uuid', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching articles:', error);
            return { error: "Failed to fetch articles" };
        }

        return { articles };
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error: "An unexpected error occurred" };
    }
}

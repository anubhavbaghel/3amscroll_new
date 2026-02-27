import { getArticles } from "@/lib/data";
import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const isDev = process.env.NODE_ENV === 'development';
export const baseUrl = isDev ? "http://localhost:3000" : (process.env.NEXT_PUBLIC_SITE_URL || "https://3amscroll.com");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await getArticles();

    // Homepage - highest priority
    const homepage = {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: "hourly" as const,
        priority: 1.0,
    };

    // Important static pages
    const staticPages = [
        { route: "/about", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    ].map((page) => ({
        url: `${baseUrl}${page.route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }));

    // Category pages - high priority for SEO
    const categories = siteConfig.categories.map((category) => ({
        url: `${baseUrl}/${category.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.9,
    }));

    // Dynamic article routes - prioritize recent articles
    const articleRoutes = articles.map((article, index) => {
        const isRecent = index < 10; // First 10 articles are most recent
        return {
            url: `${baseUrl}/article/${article.slug}`,
            lastModified: article.publishedAt || new Date().toISOString(),
            changeFrequency: "weekly" as const,
            priority: isRecent ? 0.8 : 0.7,
        };
    });

    return [homepage, ...staticPages, ...categories, ...articleRoutes];
}

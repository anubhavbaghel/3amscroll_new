import { getArticles } from "@/lib/data";
import { MetadataRoute } from "next";

export const baseUrl = "https://3amscroll.com"; // Replace with actual domain in production

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await getArticles();

    // Static routes
    const routes = [
        "",
        "/login",
        "/signup",
        "/tech",
        "/gaming",
        "/finance",
        "/lifestyle",
        "/travel",
        "/entertainment",
        "/creative",
        "/world",
        "/career",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic article routes
    const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: article.publishedAt || new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...routes, ...articleRoutes];
}

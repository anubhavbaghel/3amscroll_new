import { createClient } from "@supabase/supabase-js"; // Use direct client for Service Role
import { NextResponse } from "next/server";

// Simple XML parser helper (regex based for MVP to avoid heavy deps like xml2js)
// In production, use 'rss-parser' package
function parseRSS(xml: string) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
        const itemContent = match[1];
        const title = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || itemContent.match(/<title>(.*?)<\/title>/)?.[1];
        const link = itemContent.match(/<link>(.*?)<\/link>/)?.[1];
        const pubDate = itemContent.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
        const description = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || itemContent.match(/<description>(.*?)<\/description>/)?.[1];

        // Try to find image
        const mediaContent = itemContent.match(/<media:content[^>]*url="(.*?)"/)?.[1];
        const enclosure = itemContent.match(/<enclosure[^>]*url="(.*?)"/)?.[1];
        const image = mediaContent || enclosure || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop"; // Fallback

        if (title && link) {
            items.push({
                title: title.replace("<![CDATA[", "").replace("]]>", "").trim(),
                link: link.trim(),
                pubDate,
                description: description?.replace("<![CDATA[", "").replace("]]>", "").trim().substring(0, 200) + "...",
                image
            });
        }
    }
    return items.slice(0, 5); // Limit to 5 newest per run
}

export async function GET() {
    // 1. Init Service User (Bypasses RLS)
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    // TechCrunch RSS Feed
    const FEED_URL = "https://techcrunch.com/feed/";

    try {
        const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });
        const xml = await response.text();
        const items = parseRSS(xml);

        const results = [];

        for (const item of items) {
            // Check if exists
            const { data: existing } = await supabase
                .from("articles")
                .select("id")
                .eq("source_url", item.link) // Ensure source_url column exists now
                .single();

            if (!existing) {
                // Insert as Draft using BOT ID
                const { error } = await supabase.from("articles").insert({
                    title: item.title,
                    slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + "-" + Math.floor(Math.random() * 1000),
                    excerpt: item.description,
                    content: `<p>Source: <a href="${item.link}" target="_blank">${item.link}</a></p><p>${item.description}</p>`,
                    cover_image: item.image,
                    category: "Tech",
                    status: "draft", // IMPORTANT: Save as draft
                    source_url: item.link,
                    author_id: "d0ec9c36-0001-4444-8888-000000000001", // Use "Bot" ID (from seed)
                    author_name: "RSS Bot",
                    author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=rss",
                    read_time: 3,
                    likes_count: 0,
                    views: 0
                }).select();

                if (error) {
                    console.error("Insert error:", error);
                    results.push({ title: item.title, status: "error", details: error.message });
                } else {
                    results.push({ title: item.title, status: "draft_created" });
                }
            } else {
                results.push({ title: item.title, status: "skipped_exists" });
            }
        }

        return NextResponse.json({ success: true, results });

    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

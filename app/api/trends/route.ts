import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch real-time Daily Search Trends from across major English-speaking regions
        const regions = ['US', 'GB', 'CA', 'AU', 'IN'];

        const fetchPromises = regions.map(geo =>
            fetch(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`, {
                next: { revalidate: 3600 }, // Cache for 1 hour
            }).then(res => res.ok ? res.text() : "")
        );

        const xmlResults = await Promise.all(fetchPromises);
        let allTrends = new Set<string>();

        xmlResults.forEach(xmlText => {
            if (!xmlText) return;
            // Quick string parsing for XML <item><title>
            const trendMatches = xmlText.match(/<item>[\s\S]*?<title>(.*?)<\/title>/g);
            if (trendMatches) {
                trendMatches.forEach(match => {
                    const titleMatch = match.match(/<title>(.*?)<\/title>/);
                    if (titleMatch) {
                        const cleanTitle = titleMatch[1].replace('<![CDATA[', '').replace(']]>', '').trim();
                        if (cleanTitle) allTrends.add(cleanTitle);
                    }
                });
            }
        });

        // Convert the set to an array, shuffle it to mix regions, and take the top 12
        const trends = Array.from(allTrends)
            .sort(() => 0.5 - Math.random())
            .slice(0, 12);

        return NextResponse.json({ success: true, trends });
    } catch (error) {
        console.error("Global Trends API Error:", error);
        return NextResponse.json({ success: false, trends: [] }, { status: 500 });
    }
}

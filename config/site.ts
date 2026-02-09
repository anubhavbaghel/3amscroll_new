export const siteConfig = {
    name: "3AM SCROLL",
    description: "Your late-night scroll companion - News, articles, and stories for Gen Z",
    url: "https://3amscroll.com",
    ogImage: "https://3amscroll.com/og.jpg",
    links: {
        twitter: "https://twitter.com/3amscroll",
        instagram: "https://instagram.com/3amscroll",
    },
    categories: [
        {
            id: "tech",
            name: "Tech & Innovation",
            slug: "tech",
            description: "Latest in technology, gadgets, and digital trends"
        },
        {
            id: "gaming",
            name: "Gaming & Esports",
            slug: "gaming",
            description: "Gaming news, reviews, and esports coverage"
        },
        {
            id: "entertainment",
            name: "Entertainment",
            slug: "entertainment",
            description: "Movies, TV shows, music, and pop culture"
        },
        {
            id: "career",
            name: "Career & Money",
            slug: "career",
            description: "Career advice, side hustles, and financial tips"
        },
        {
            id: "world",
            name: "World",
            slug: "world",
            description: "Global news and current events"
        },
        {
            id: "creativity",
            name: "Creativity & Art",
            slug: "creativity",
            description: "Art, design, and creative inspiration"
        },
        {
            id: "lifestyle",
            name: "Lifestyle & Wellness",
            slug: "lifestyle",
            description: "Health, fitness, and lifestyle trends"
        },
        {
            id: "quick-reads",
            name: "Quick Reads",
            slug: "quick-reads",
            description: "Stories you can read in under 3 minutes"
        },
    ],
} as const;

export type Category = typeof siteConfig.categories[number];

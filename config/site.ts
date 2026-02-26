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
            id: "culture",
            name: "Culture",
            slug: "culture",
            description: "Trends, entertainment, fashion, music, food, and internet moments."
        },
        {
            id: "real-talk",
            name: "Real Talk",
            slug: "real-talk",
            description: "Mental health, identity, relationships, sex, and the hard conversations."
        },
        {
            id: "tech-future",
            name: "Tech & Future",
            slug: "tech-future",
            description: "AI, innovation, social media, gaming, digital life, crypto, and the future of work."
        },
        {
            id: "planet",
            name: "Planet",
            slug: "planet",
            description: "Climate, sustainability, activism, and social justice."
        },
        {
            id: "hustle",
            name: "Hustle",
            slug: "hustle",
            description: "Careers, money, side hustles, entrepreneurship, and financial literacy."
        },
        {
            id: "wellness",
            name: "Wellness",
            slug: "wellness",
            description: "Physical health, fitness, skincare, sleep, and nutrition — kept real, not toxic positivity."
        },
    ],
} as const;

export type Category = typeof siteConfig.categories[number];

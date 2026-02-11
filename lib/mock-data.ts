import { Article } from "@/types";

export const mockArticles: Article[] = [
    {
        id: "1",
        slug: "ai-revolution-2026",
        title: "The AI Revolution Is Here: What Gen Z Needs to Know",
        excerpt: "From ChatGPT to autonomous agents, AI is reshaping our world faster than ever. Here's what you need to know to stay ahead.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop",
        category: "Tech",
        author: {
            id: "author-1",
            name: "Sarah Chen",
            role: "Senior Tech Editor",
            avatar: "https://i.pravatar.cc/150?img=1",
            bio: "Tech journalist covering AI and emerging technologies. Formerly at Wired and TechCrunch.",
            location: "San Francisco, CA",
            social: {
                twitter: "https://twitter.com/sarahchen",
                linkedin: "https://linkedin.com/in/sarahchen",
                website: "https://sarahchen.com"
            }
        },
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        readTime: 5,
        views: 1542,
        likes: 1234,
        comments: 89,
        tags: ["AI", "Technology", "Future"],
    },
    {
        id: "2",
        slug: "gaming-industry-trends",
        title: "Top 10 Games That Defined 2026 (So Far)",
        excerpt: "From indie gems to AAA blockbusters, these are the games everyone's talking about this year.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=675&fit=crop",
        category: "Gaming",
        author: {
            id: "author-2",
            name: "Marcus Johnson",
            avatar: "https://i.pravatar.cc/150?img=12",
            bio: "Gaming enthusiast and esports commentator",
        },
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        readTime: 8,
        views: 2891,
        likes: 2456,
        comments: 234,
        tags: ["Gaming", "Reviews", "2026"],
    },
    {
        id: "3",
        slug: "side-hustle-guide",
        title: "7 Side Hustles That Actually Made Me $10K This Month",
        excerpt: "Real talk: here's how I went from broke college student to earning five figures monthly with these proven strategies.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop",
        category: "Career",
        author: {
            id: "author-3",
            name: "Alex Rivera",
            avatar: "https://i.pravatar.cc/150?img=33",
            bio: "Entrepreneur and career coach for Gen Z",
        },
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        readTime: 6,
        views: 6543,
        likes: 5678,
        comments: 456,
        tags: ["Career", "Money", "Side Hustle"],
    },
    {
        id: "4",
        slug: "netflix-must-watch",
        title: "The Netflix Show Everyone's Binge-Watching Right Now",
        excerpt: "This new series just dropped and it's already breaking records. Here's why you need to watch it ASAP.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=675&fit=crop",
        category: "Entertainment",
        author: {
            id: "author-4",
            name: "Emma Watson",
            avatar: "https://i.pravatar.cc/150?img=5",
            bio: "Pop culture critic and entertainment writer",
        },
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        readTime: 4,
        views: 4321,
        likes: 3421,
        comments: 178,
        tags: ["Netflix", "TV Shows", "Entertainment"],
    },
    {
        id: "5",
        slug: "climate-action-now",
        title: "Gen Z Is Leading the Climate Fight—And Winning",
        excerpt: "From viral TikTok campaigns to real policy changes, young activists are making unprecedented impact.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=675&fit=crop",
        category: "World",
        author: {
            id: "author-5",
            name: "Priya Sharma",
            avatar: "https://i.pravatar.cc/150?img=45",
            bio: "Environmental journalist and climate activist",
        },
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        readTime: 7,
        views: 5678,
        likes: 4567,
        comments: 312,
        tags: ["Climate", "Activism", "Environment"],
    },
    {
        id: "6",
        slug: "digital-art-nfts",
        title: "How I Sold My First Digital Art for $5,000",
        excerpt: "A complete beginner's guide to creating and selling digital art in 2026, no art degree required.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=1200&h=675&fit=crop",
        category: "Creativity",
        author: {
            id: "author-6",
            name: "Jordan Lee",
            avatar: "https://i.pravatar.cc/150?img=68",
            bio: "Digital artist and creative entrepreneur",
        },
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        readTime: 5,
        views: 1542,
        likes: 2890,
        comments: 145,
        tags: ["Art", "NFT", "Digital"],
    },
    {
        id: "7",
        slug: "mental-health-tips",
        title: "5 Mental Health Habits That Changed My Life",
        excerpt: "Struggling with anxiety and burnout? These science-backed strategies helped me find balance.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=675&fit=crop",
        category: "Lifestyle",
        author: {
            id: "author-7",
            name: "Taylor Brooks",
            avatar: "https://i.pravatar.cc/150?img=20",
            bio: "Wellness advocate and mental health educator",
        },
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        readTime: 4,
        views: 4321,
        likes: 6789,
        comments: 523,
        tags: ["Mental Health", "Wellness", "Self Care"],
    },
    {
        id: "8",
        slug: "quick-read-tech-news",
        title: "Tech News Roundup: What You Missed This Week",
        excerpt: "All the biggest tech stories from the past 7 days, summarized in under 3 minutes.",
        content: "",
        coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=675&fit=crop",
        category: "Quick Reads",
        author: {
            id: "author-1",
            name: "Sarah Chen",
            avatar: "https://i.pravatar.cc/150?img=1",
            bio: "Tech journalist covering AI and emerging technologies",
        },
        publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        readTime: 2,
        views: 890,
        likes: 1567,
        comments: 67,
        tags: ["Tech", "News", "Quick Read"],
    },
];

export const categories = [
    {
        id: "tech",
        name: "Tech",
        slug: "tech",
        description: "The latest in technology, AI, and gadgets making waves in the industry.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    },
    {
        id: "gaming",
        name: "Gaming",
        slug: "gaming",
        description: "Game reviews, esports news, and deep dives into gaming culture.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    },
    {
        id: "career",
        name: "Career",
        slug: "career",
        description: "Advice on side hustles, remote work, and navigating the modern workplace.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop",
    },
    {
        id: "entertainment",
        name: "Entertainment",
        slug: "entertainment",
        description: "Movies, TV shows, music, and pop culture analysis.",
        image: "https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?w=1200&h=600&fit=crop",
    },
    {
        id: "world",
        name: "World",
        slug: "world",
        description: "Global news, climate action, and social movements affecting our generation.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop",
    },
    {
        id: "creativity",
        name: "Creativity",
        slug: "creativity",
        description: "Inspiration for artists, designers, and creators.",
        image: "https://images.unsplash.com/photo-1499750310159-5254f412d2f1?w=1200&h=600&fit=crop",
    },
    {
        id: "lifestyle",
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Wellness, mental health, and tips for living your best life.",
        image: "https://images.unsplash.com/photo-1545205566-3da8dcc7766b?w=1200&h=600&fit=crop",
    },
];

export function getCategory(slug: string) {
    return categories.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getAuthor(id: string) {
    const article = mockArticles.find(a => a.author.id === id);
    return article?.author;
}

export function getAuthorArticles(authorId: string) {
    return mockArticles.filter(a => a.author.id === authorId);
}

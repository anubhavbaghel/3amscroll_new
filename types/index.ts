// Article type
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    author: Author;
    publishedAt: string;
    readTime: number;
    views: number;
    likes: number;
    comments: number;
    tags: string[];
}

// Author type
export interface Author {
    id: string;
    name: string;
    avatar: string;
    role?: string;
    bio: string;
    location?: string;
    social?: {
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        website?: string;
    };
}

// User type
export interface User {
    id: string;
    email: string;
    name: string;
    username?: string; // Added username
    avatar?: string;
    banner?: string; // Added banner
    bio?: string;   // Added bio
    website?: string; // Added website
    location?: string; // Added location
    social_links?: {  // Added social_links
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        github?: string;
    };
    role: "user" | "author" | "admin";
    savedArticles: string[];
    preferences: {
        categories: string[];
        notifications: boolean;
        theme: "light" | "dark" | "system";
    };
    joinedAt?: string; // Added joined date
}

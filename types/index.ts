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
    likes: number;
    comments: number;
    tags: string[];
}

// Author type
export interface Author {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    social?: {
        twitter?: string;
        instagram?: string;
    };
}

// User type
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: "user" | "author" | "admin";
    savedArticles: string[];
    preferences: {
        categories: string[];
        notifications: boolean;
        theme: "light" | "dark" | "system";
    };
}

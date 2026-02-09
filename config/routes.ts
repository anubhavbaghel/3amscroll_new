export const routes = {
    home: "/",
    trending: "/trending",
    category: (slug: string) => `/${slug}`,
    article: (slug: string) => `/article/${slug}`,
    author: (id: string) => `/author/${id}`,
    search: "/search",
    about: "/about",

    // Auth routes
    login: "/login",
    signup: "/signup",

    // User routes
    profile: "/profile",
    saved: "/saved",
    settings: "/settings",

    // Admin routes
    admin: {
        dashboard: "/admin",
        articles: "/admin/articles",
        newArticle: "/admin/articles/new",
        editArticle: (id: string) => `/admin/articles/${id}/edit`,
        analytics: "/admin/analytics",
        settings: "/admin/settings",
    },
} as const;

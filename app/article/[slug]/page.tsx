import { notFound } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { AuthorCardDetailed } from "@/components/article/AuthorCardDetailed";
import { BookmarkButton } from "@/components/article/BookmarkButton";
import { ShareButton } from "@/components/article/ShareButton";
import { MobileArticleBar } from "@/components/article/MobileArticleBar";
import { ArticleNavbar } from "@/components/article/ArticleNavbar";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { FocusModeProvider } from "@/context/FocusModeContext";
import "../../article-styles.css";
import dynamic from "next/dynamic";

import { getArticleBySlug, getSavedArticleIds, getRelatedArticles } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { baseUrl } from "@/app/sitemap";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return { title: "Article Not Found | 3AM SCROLL" };
    }

    // Ensure OG image URL is absolute and uses the production domain
    const ogUrl = new URL(`${baseUrl}/api/og`);
    ogUrl.searchParams.set('title', article.title);
    ogUrl.searchParams.set('author', article.author.name);
    ogUrl.searchParams.set('date', new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    ogUrl.searchParams.set('readTime', article.readTime.toString());
    ogUrl.searchParams.set('cover', article.coverImage);

    const articleUrl = `${baseUrl}/article/${article.slug}`;

    return {
        title: `${article.title} | 3AM SCROLL`,
        description: article.excerpt,
        alternates: {
            canonical: articleUrl,
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: articleUrl,
            siteName: '3AM SCROLL',
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ],
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [ogUrl.toString()],
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const [savedArticleIds] = await Promise.all([
        user ? getSavedArticleIds(user.id) : Promise.resolve(new Set<string>()),
    ]);

    const relatedArticles = await getRelatedArticles(article.category, article.id);

    const isBookmarked = savedArticleIds.has(article.id);


    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "image": [article.coverImage],
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt || article.publishedAt,
        "author": [{
            "@type": "Person",
            "name": article.author.name,
            "url": `${baseUrl}/author/${article.author.id}`,
            "description": article.author.bio
        }],
        "publisher": {
            "@type": "Organization",
            "name": "3AM SCROLL",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/icon-512.png`
            },
            "description": "Your late-night scroll companion - News, articles, and stories for Gen Z"
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${baseUrl}/article/${article.slug}` }
    };

    const breadcrumbItems = [
        { name: "Articles", item: `${baseUrl}/trending` }, // Or appropriate parent
        { name: article.category, item: `${baseUrl}/${article.category.toLowerCase()}` },
        { name: article.title, item: `${baseUrl}/article/${article.slug}` }
    ];

    return (
        <FocusModeProvider>
            <div className="min-h-screen bg-white dark:bg-dark-bg">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <BreadcrumbJsonLd items={breadcrumbItems} />

                <ArticleNavbar
                    user={user}
                    articleId={article.id}
                    articleTitle={article.title}
                    articleSlug={article.slug}
                    initialIsBookmarked={isBookmarked}
                />

                {/* ─── ARTICLE HEADER ─────────────────────────────────────
                    Order: category → title → date/readtime → author+follow → excerpt
                ──────────────────────────────────────────────────────── */}
                <ArticleHeader article={article} />

                {/* ─── COVER IMAGE — wider than text column ─────────────── */}
                {article.coverImage && (
                    <div className="max-w-[680px] mx-auto px-4 sm:px-6 mt-8 mb-10">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg">
                            <Image
                                src={article.coverImage}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 860px"
                            />
                        </div>
                    </div>
                )}

                {/* ─── ARTICLE BODY ─────────────────────────────────────── */}
                <main className="max-w-[680px] mx-auto px-4 sm:px-6 pb-32 lg:pb-16">

                    {/* Breadcrumbs */}
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[
                                { label: article.category, href: `/${article.category.toLowerCase()}` },
                                { label: article.title, href: `/article/${article.slug}`, active: true }
                            ]}
                        />
                    </div>

                    {/* Article text content */}
                    <ArticleContent article={article} />

                    <div className="hidden lg:flex items-center justify-between py-5 mt-10 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-6">
                        </div>
                        <div className="flex items-center gap-1">
                            <BookmarkButton
                                articleId={article.id}
                                initialIsBookmarked={isBookmarked}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            />
                            <ShareButton
                                title={article.title}
                                excerpt={article.excerpt}
                                url={`${baseUrl}/article/${article.slug}`}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* ─── DETAILED AUTHOR CARD ─────────────────────────── */}
                    <AuthorCardDetailed
                        author={article.author}
                        followersCount={0}
                    />


                    {/* ─── RELATED ARTICLES ─────────────────────────────── */}
                    <div className="mt-12">
                        <RelatedArticles articles={relatedArticles} />
                    </div>
                </main>

                {/* ─── MOBILE BOTTOM BAR ────────────────────────────────
                    Applaud · Comment · Bookmark · Share — mobile only
                ──────────────────────────────────────────────────────── */}
                <MobileArticleBar
                    articleId={article.id}
                    articleTitle={article.title}
                    articleExcerpt={article.excerpt}
                    articleSlug={article.slug}
                    initialIsBookmarked={isBookmarked}
                />

                <Footer />
            </div>
        </FocusModeProvider>
    );
}

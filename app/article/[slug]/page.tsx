import { notFound } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { AuthorCard } from "@/components/article/AuthorCard";
import { LikeButton } from "@/components/article/LikeButton";
import { BookmarkButton } from "@/components/article/BookmarkButton";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { mockArticles } from "@/lib/mock-data";
import { getArticleBySlug, getSavedArticleIds, getLikedArticleIds } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { baseUrl } from "@/app/sitemap";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found | 3AM SCROLL",
        };
    }

    const ogUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL || 'https://3amscroll.vercel.app'}/api/og`);
    ogUrl.searchParams.set('title', article.title);
    ogUrl.searchParams.set('author', article.author.name);
    ogUrl.searchParams.set('date', new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    ogUrl.searchParams.set('readTime', article.readTime.toString());
    ogUrl.searchParams.set('cover', article.coverImage);

    return {
        title: `${article.title} | 3AM SCROLL`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `https://3amscroll.com/article/${article.slug}`,
            siteName: '3AM SCROLL',
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
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
    const { data: { user } } = await supabase.auth.getUser();

    const [article, savedArticleIds, likedArticleIds] = await Promise.all([
        getArticleBySlug(slug),
        user ? getSavedArticleIds(user.id) : Promise.resolve(new Set<string>()),
        user ? getLikedArticleIds(user.id) : Promise.resolve(new Set<string>())
    ]);

    if (!article) {
        notFound();
    }

    // Get related articles (same category, excluding current)
    const relatedArticles = mockArticles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "image": [article.coverImage],
        "datePublished": article.publishedAt,
        "dateModified": article.publishedAt,
        "author": [{
            "@type": "Person",
            "name": article.author.name,
            "url": `${baseUrl}/author/${article.author.id}`
        }]
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Simple Article Header */}
            <ArticleHeader article={article} />

            {/* Feature Image */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
                <ArticleContent article={article} />

                {/* Author Card */}
                <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
                    <AuthorCard
                        author={article.author.name}
                        authorId={article.author.id}
                        avatar={article.author.avatar}
                        bio={article.author.bio}
                        articlesCount={12}
                    />
                </div>

                {/* Related Articles */}
                <div className="mt-12">
                    <RelatedArticles articles={relatedArticles} />
                </div>
            </main>

            {/* Simple Engagement Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-40 lg:hidden">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <LikeButton
                            articleId={article.id}
                            initialLikes={article.likes}
                            initialIsLiked={likedArticleIds.has(article.id)}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                        />
                        <span className="text-gray-400">·</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{article.comments} comments</span>
                    </div>
                    <BookmarkButton
                        articleId={article.id}
                        initialIsBookmarked={savedArticleIds.has(article.id)}
                        className="text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
                    />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

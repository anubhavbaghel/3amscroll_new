"use client";

import { Article } from "@/types";

interface ArticleContentProps {
    article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
    return (
        <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Article Header */}
            <header className="not-prose mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                    {article.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800" />
                        <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100">{article.author.name}</div>
                            <div className="text-xs">{formatDate(article.publishedAt)}</div>
                        </div>
                    </div>
                    <span>•</span>
                    <span>{article.readTime} min read</span>
                    <span>•</span>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {formatNumber(article.views)}
                        </span>
                    </div>
                </div>
            </header>

            {/* Article Body - This would be rich content from CMS */}
            <div className="article-body">
                <p className="lead text-xl text-gray-700 dark:text-gray-300 mb-6">
                    {article.excerpt}
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2>Understanding the Core Concepts</h2>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <blockquote>
                    &quot;This is an important quote that highlights a key point in the article. It stands out from the regular text.&quot;
                </blockquote>

                <h3>Key Takeaways</h3>
                <ul>
                    <li>First important point to remember</li>
                    <li>Second crucial insight from the article</li>
                    <li>Third essential concept explained</li>
                    <li>Fourth valuable lesson learned</li>
                </ul>

                <h2>Practical Applications</h2>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>

                <h3>Step-by-Step Guide</h3>
                <ol>
                    <li>Start with the foundation and basics</li>
                    <li>Build upon your understanding gradually</li>
                    <li>Practice with real-world examples</li>
                    <li>Refine and optimize your approach</li>
                </ol>

                <h2>Conclusion</h2>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                    eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                </p>
            </div>
        </article>
    );
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

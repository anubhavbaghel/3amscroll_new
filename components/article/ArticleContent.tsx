"use client";

import { Article } from "@/types";
import DOMPurify from "isomorphic-dompurify";

interface ArticleContentProps {
    article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
    return (
        <article className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:leading-tight prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-6
            prose-a:text-brand prose-a:no-underline hover:prose-a:underline 
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
            prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:pl-6 prose-blockquote:italic
            prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
            {/* Article Body - Render actual content from database */}
            <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
            />
        </article>
    );
}

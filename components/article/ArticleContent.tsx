"use client";

import { Article } from "@/types";
import DOMPurify from "isomorphic-dompurify";

interface ArticleContentProps {
    article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
    return (
        <article
            className="
                prose prose-lg dark:prose-invert max-w-none

                /* Base text */
                prose-p:text-[1.125rem] prose-p:leading-[1.85] prose-p:text-gray-800 dark:prose-p:text-gray-200
                prose-p:mb-7 prose-p:font-normal

                /* Headings */
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3

                /* Links */
                prose-a:text-brand prose-a:no-underline prose-a:font-medium
                hover:prose-a:underline

                /* Images */
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-10 prose-img:w-full

                /* Blockquote — Medium style: left border, italic, large */
                prose-blockquote:border-l-[3px] prose-blockquote:border-brand
                prose-blockquote:pl-6 prose-blockquote:italic
                prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300
                prose-blockquote:not-italic prose-blockquote:font-normal
                prose-blockquote:text-[1.25rem] prose-blockquote:leading-relaxed
                prose-blockquote:my-8

                /* Code */
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-code:text-[0.875em] prose-code:font-mono
                prose-code:text-gray-800 dark:prose-code:text-gray-200
                prose-code:before:content-none prose-code:after:content-none

                /* Pre / code blocks */
                prose-pre:bg-gray-950 dark:prose-pre:bg-gray-900
                prose-pre:rounded-xl prose-pre:shadow-lg prose-pre:my-8

                /* Lists */
                prose-ul:my-6 prose-ol:my-6
                prose-li:my-2 prose-li:text-[1.125rem] prose-li:leading-[1.75]
                prose-li:text-gray-800 dark:prose-li:text-gray-200

                /* Strong */
                prose-strong:font-semibold prose-strong:text-gray-900 dark:prose-strong:text-white

                /* HR */
                prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-hr:my-12

                /* First paragraph — slightly larger lead */
                [&>p:first-child]:text-[1.2rem] [&>p:first-child]:leading-[1.8] [&>p:first-child]:text-gray-700 dark:[&>p:first-child]:text-gray-300
            "
        >
            <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
            />
        </article>
    );
}

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";

interface ArticleHeaderProps {
    article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
    return (
        <header className="max-w-[680px] mx-auto px-4 sm:px-6 pt-24 lg:pt-32 pb-0">

            {/* Category pill */}
            {article.category && (
                <Link
                    href={`/category/${article.category.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand mb-5 hover:opacity-70 transition-opacity"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    {article.category}
                </Link>
            )}

            {/* Title */}
            <h1 className="text-[1.875rem] sm:text-[2.25rem] lg:text-[2.75rem] font-bold leading-[1.2] tracking-tight mb-3 text-gray-900 dark:text-white font-display">
                {article.title}
            </h1>

            {/* Date · Read time — directly below title */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>{formatDate(article.publishedAt)}</span>
                <span>·</span>
                <span>{article.readTime} min read</span>
            </div>

            {/* Author row — avatar + name + follow */}
            <div className="flex items-center gap-3 mb-7">
                <Link href={routes.author(article.author.id)} className="shrink-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
                        {article.author.avatar ? (
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-brand flex items-center justify-center text-white font-bold">
                                {article.author.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>
                </Link>
                <div className="flex-1 min-w-0">
                    <Link
                        href={routes.author(article.author.id)}
                        className="font-semibold text-sm text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand transition-colors"
                    >
                        {article.author.name}
                    </Link>
                </div>
                {/* Follow button */}
                <button className="shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand transition-colors">
                    Follow
                </button>
            </div>

            {/* Excerpt — below author */}
            <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 leading-relaxed mb-0">
                {article.excerpt}
            </p>
        </header>
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

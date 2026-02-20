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
                    href={`/${article.category.toLowerCase()}`}
                    className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-brand mb-6 hover:opacity-70 transition-opacity"
                >
                    <span className="w-[6px] h-[6px] rounded-full bg-brand" />
                    {article.category}
                </Link>
            )}

            {/* Title */}
            <h1 className="text-[2.125rem] sm:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.05] tracking-tight mb-8 text-gray-900 dark:text-white font-display">
                {article.title}
            </h1>

            {/* Author row — Avatar + Multi-row Meta */}
            <div className="flex items-center gap-4 mb-10">
                <Link href={routes.author(article.author.id)} className="shrink-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
                        {article.author.avatar ? (
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-brand flex items-center justify-center text-white font-bold text-xl">
                                {article.author.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>
                </Link>

                <div className="flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-2 leading-none mb-1.5">
                        <Link
                            href={routes.author(article.author.id)}
                            className="font-bold text-[1rem] text-gray-900 dark:text-white hover:text-brand transition-colors"
                        >
                            {article.author.name}
                        </Link>
                        <button className="text-[0.875rem] font-bold text-brand hover:underline">
                            Follow
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-[0.8125rem] font-medium text-gray-500 dark:text-gray-400 leading-none">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>·</span>
                        <span>{article.readTime} min read</span>
                    </div>
                </div>
            </div>

            {/* Excerpt — directly below author metadata */}
            <p className="text-[1.125rem] text-gray-600 dark:text-gray-400 leading-[1.6] mb-12 font-medium">
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

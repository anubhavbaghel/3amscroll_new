import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { routes } from "@/config/routes";

interface PopularSidebarProps {
    articles: Article[];
}

export function PopularSidebar({ articles }: PopularSidebarProps) {
    return (
        <div className="space-y-8">
            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                Popular
            </h3>
            <div className="space-y-6">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={routes.article(article.slug)}
                        className="group flex flex-col gap-3"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
                            <Image
                                src={article.coverImage}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 300px"
                            />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-brand transition-colors">
                                {article.title}
                            </h4>
                            <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-2">
                                {article.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

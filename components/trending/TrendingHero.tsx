import Link from "next/link";
import { Article } from "@/types";
import { TrendingUp, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingHeroProps {
    articles: Article[];
}

export function TrendingHero({ articles }: TrendingHeroProps) {
    if (articles.length < 3) return null;

    const [first, second, third] = articles;

    return (
        <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-yellow-400/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-yellow-500" />
                </div>
                <h1 className="text-3xl font-bold">Trending Now</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
                {/* Second Place (Left) */}
                <div className="order-2 md:order-1">
                    <TrendingCard article={second} rank={2} />
                </div>

                {/* First Place (Center - Prominent) */}
                <div className="order-1 md:order-2 -mt-8 md:-mt-12 z-10">
                    <TrendingCard article={first} rank={1} isLarge />
                </div>

                {/* Third Place (Right) */}
                <div className="order-3 md:order-3">
                    <TrendingCard article={third} rank={3} />
                </div>
            </div>
        </section>
    );
}

function TrendingCard({ article, rank, isLarge = false }: { article: Article; rank: number; isLarge?: boolean }) {
    const rankColors = {
        1: "bg-yellow-400 text-yellow-950 border-yellow-200", // Gold
        2: "bg-slate-300 text-slate-800 border-slate-200",      // Silver
        3: "bg-orange-300 text-orange-900 border-orange-200"    // Bronze
    };

    return (
        <Link href={`/article/${article.slug}`} className="group block relative">
            {/* Rank Badge */}
            <div className={cn(
                "absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl border-4 border-white dark:border-black shadow-lg",
                rankColors[rank as keyof typeof rankColors]
            )}>
                #{rank}
            </div>

            <div className={cn(
                "relative rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 shadow-sm group-hover:shadow-xl bg-white dark:bg-gray-900",
                isLarge ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[3/4]"
            )}>
                {/* Image */}
                <img
                    src={article.coverImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 text-xs font-medium mb-2 opacity-90">
                        <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                            {article.category}
                        </span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views?.toLocaleString()}
                        </div>
                    </div>

                    <h3 className={cn(
                        "font-bold leading-tight mb-2 line-clamp-2 font-display",
                        isLarge ? "text-2xl md:text-3xl" : "text-xl"
                    )}>
                        {article.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span>{article.author.name}</span>
                        <span>•</span>
                        <span>{article.readTime} min read</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Helper for class merging if not already in project, but assuming generic cn utility exists or I should create one.
// I'll check lib/utils.ts or mock it.
// Wait, I haven't checked lib/utils.ts. If it doesn't exist I'll use template literals.

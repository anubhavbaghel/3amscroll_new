import Link from "next/link";
import Image from "next/image";
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
        <section className="mb-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/20 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

            <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-brand/10 rounded-xl border border-brand/20 backdrop-blur-sm">
                    <TrendingUp className="w-8 h-8 text-brand animate-pulse" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-black font-logo tracking-tight uppercase italic relative">
                        Trending Now
                        <span className="absolute -top-2 -right-6 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded animate-bounce">LIVE</span>
                    </h1>
                    <p className="text-gray-500 font-medium">What the world is reading at 3AM.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* #1 Featured (Span 8) */}
                <div className="md:col-span-8 relative group">
                    <TrendingCard article={first} rank={1} isLarge priority={true} />
                </div>

                {/* #2 & #3 Stacked (Span 4) */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <TrendingCard article={second} rank={2} />
                    <TrendingCard article={third} rank={3} />
                </div>
            </div>
        </section>
    );
}

function TrendingCard({ article, rank, isLarge = false, priority = false }: { article: Article; rank: number; isLarge?: boolean; priority?: boolean }) {
    return (
        <Link href={`/article/${article.slug}`} className="group block relative w-full h-full">
            <div className={cn(
                "relative rounded-3xl overflow-hidden transition-all duration-500 ease-out group-hover:shadow-2xl ring-1 ring-white/10 group-hover:ring-brand/50",
                isLarge ? "aspect-[4/3] md:h-[600px]" : "aspect-[4/3] md:h-[288px]"
            )}>
                {/* Image */}
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={priority}
                    sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Rank Number (Big Background) */}
                <div className="absolute top-4 left-6 text-[8rem] md:text-[10rem] font-black text-white/5 leading-none font-logo select-none pointer-events-none z-0 rotate-12 mix-blend-overlay">
                    {rank}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-brand/20">
                            #{rank} Trending
                        </span>
                        <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                            <Eye className="w-3.5 h-3.5" />
                            {article.views?.toLocaleString()}
                        </div>
                    </div>

                    <h3 className={cn(
                        "font-black text-white leading-[0.9] mb-4 font-logo uppercase italic group-hover:text-brand-glow transition-colors",
                        isLarge ? "text-3xl md:text-5xl lg:text-6xl" : "text-xl md:text-2xl"
                    )}>
                        {article.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                        <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden relative border border-white/20">
                            {/* Author Avatar Placeholder */}
                            <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author.name}`} alt={article.author.name} fill />
                        </div>
                        <span>{article.author.name}</span>
                        <span className="text-gray-500">•</span>
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

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";

interface CategoryHeaderProps {
    category: {
        name: string;
        description: string;
    };
    stats: {
        articlesCount: number;
        authorsCount: number;
    };
}

export function CategoryHeader({ category, stats }: CategoryHeaderProps) {
    return (
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 py-12 md:py-16 mb-8 rounded-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pattern-dots" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href={routes.home}
                    className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    {category.name}
                </h1>

                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8 leading-relaxed">
                    {category.description}
                </p>

                <div className="flex items-center gap-6 text-sm font-medium text-white/90">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{stats.articlesCount}</span>
                        <span className="text-blue-200">Articles</span>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{stats.authorsCount}</span>
                        <span className="text-blue-200">Authors</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

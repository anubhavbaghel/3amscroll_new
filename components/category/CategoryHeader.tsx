"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Article } from "@/types";
import { routes } from "@/config/routes";

interface CategoryHeaderProps {
    category: {
        name: string;
        description?: string;
    } | string;
    count?: number;
    featuredArticle?: Article;
}

export function CategoryHeader({ category, count, featuredArticle }: CategoryHeaderProps) {
    const categoryName = typeof category === 'string' ? category : category.name;
    const categoryDescription = typeof category === 'string'
        ? `Explore the latest stories, deep dives, and trends in ${category}.`
        : category.description;

    // Dynamic gradients based on category (fallback)
    const getGradient = (cat: string) => {
        switch (cat.toLowerCase()) {
            case "culture": return "from-fuchsia-600 via-purple-600 to-indigo-900";
            case "real talk": return "from-rose-600 via-red-600 to-orange-900";
            case "tech & future": return "from-blue-600 via-cyan-600 to-teal-900"; // Changed neon
            case "planet": return "from-emerald-600 via-green-600 to-lime-900";
            case "hustle": return "from-yellow-500 via-amber-600 to-orange-900";
            case "wellness": return "from-sky-400 via-blue-500 to-indigo-900";
            default: return "from-gray-700 via-gray-800 to-black";
        }
    };

    const isCoverMode = !!featuredArticle;

    return (
        <div className={`relative w-full overflow-hidden flex flex-col justify-end transition-all duration-700 ${isCoverMode ? 'h-[75vh] lg:h-[65vh]' : 'h-[40vh] lg:h-[50vh]'}`}>

            {/* Background Layer */}
            {isCoverMode ? (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={featuredArticle.coverImage}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                        priority
                    />
                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
                </div>
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(categoryName)} opacity-90 z-0`}>
                    <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                    <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-gradient-radial from-white/10 to-transparent blur-3xl animate-slow-spin"></div>
                </div>
            )}

            {/* Top Navigation - Moved outside content div to stick to top */}
            <div className="absolute top-0 left-0 w-full z-20 p-6 lg:p-8 flex justify-between items-start">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group backdrop-blur-md bg-black/10 px-4 py-2 rounded-full border border-white/10"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Home</span>
                </Link>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12 lg:pb-16 text-white">



                {/* Editorial Layout */}
                <div className="flex flex-col gap-2">
                    {/* Cover Story Badge */}
                    {isCoverMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <span className="px-3 py-1 bg-brand text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                Latest Issue
                            </span>
                            <Link href={routes.article(featuredArticle.slug)} className="group/link flex items-center gap-2 hover:underline decoration-1 underline-offset-4">
                                <span className="text-sm md:text-base font-medium line-clamp-1 max-w-[200px] md:max-w-md text-gray-200 group-hover/link:text-white transition-colors">
                                    {featuredArticle.title}
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover/link:text-white" />
                            </Link>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className={`font-black uppercase leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-display transform -ml-[0.5vw] lg:-ml-4 whitespace-nowrap ${categoryName.length > 10
                            ? 'text-[10vw] lg:text-[9rem]'
                            : 'text-[15vw] lg:text-[12rem]'
                            }`}>
                            {categoryName}
                        </h1>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-center justify-between mt-8 border-t border-white/20 pt-6 gap-6"
                >
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-xl leading-relaxed">
                        {categoryDescription}
                    </p>

                    {count !== undefined && (
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <span className="block text-3xl font-bold text-white leading-none">{count}</span>
                                <span className="text-[10px] text-white/50 uppercase tracking-widest">Stories</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

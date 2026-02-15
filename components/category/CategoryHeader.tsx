"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CategoryHeaderProps {
    category: string;
    count?: number;
}

export function CategoryHeader({ category, count }: CategoryHeaderProps) {
    // Dynamic gradients based on category (simplified for now, can be expanded)
    const getGradient = (cat: string) => {
        switch (cat.toLowerCase()) {
            case "tech": return "from-blue-600 via-purple-600 to-indigo-900";
            case "gaming": return "from-purple-600 via-pink-600 to-rose-900";
            case "finance": return "from-emerald-600 via-teal-600 to-cyan-900";
            case "lifestyle": return "from-orange-500 via-amber-500 to-yellow-900";
            default: return "from-gray-700 via-gray-800 to-black";
        }
    };

    return (
        <div className="relative w-full h-[40vh] lg:h-[50vh] overflow-hidden flex flex-col justify-end">
            {/* Animated Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(category)} opacity-90`}>
                <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-gradient-radial from-white/10 to-transparent blur-3xl animate-slow-spin"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12 lg:pb-16">
                {/* Breadcrumb / Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest font-medium">Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-display transform -ml-0.5 lg:-ml-2 break-words">
                        {category}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex items-center justify-between mt-6 border-t border-white/20 pt-6"
                >
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-xl">
                        Explore the latest stories, deep dives, and trends in {category}.
                    </p>
                    {count !== undefined && (
                        <div className="hidden md:block text-right">
                            <span className="block text-4xl font-bold text-white">{count}</span>
                            <span className="text-sm text-white/50 uppercase tracking-widest">Articles</span>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

"use client";

import { TrendingUp } from "lucide-react";

export function TrendingTicker() {
    const topics = [
        "Artificial Intelligence",
        "Cyberpunk 2077 Update",
        "SpaceX Launch",
        "New iPhone 16",
        "React Server Components",
        "Climate Tech",
        "Formula 1",
        "Indie Gaming",
        "Neuralink"
    ];

    return (
        <div className="w-full bg-black text-white overflow-hidden py-3 border-y border-white/10 relative z-20">
            <div className="flex items-center gap-8 animate-infinite-scroll whitespace-nowrap">
                {[...topics, ...topics, ...topics].map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/80">
                        <TrendingUp className="w-3 h-3 text-brand" />
                        <span>{topic}</span>
                    </div>
                ))}
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />
        </div>
    );
}

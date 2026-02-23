"use client";

import Link from "next/link";
import { ArrowRight, Zap, Gamepad2, Globe2, Moon } from "lucide-react";

export default function IntroPage() {
    const handleStart = (e: React.MouseEvent) => {
        e.preventDefault();
        // Set a cookie that lasts for 1 year (365 days)
        document.cookie = "has_visited_3amscroll=true; path=/; max-age=31536000; SameSite=Lax";
        // Force a hard reload to ensure the middleware receives the newly minted cookie
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg selection:bg-brand/30 selection:text-brand relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-brand/10 dark:bg-brand/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none opacity-50 dark:opacity-30" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-800 dark:text-gray-200">
                        <Moon className="w-4 h-4 text-brand" />
                        <span>Welcome to your new digital sanctuary</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] font-display">
                        The internet's noise,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600 dark:to-purple-400">
                            curated for the night.
                        </span>
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                        3AM SCROLL is a platform built for Gen Z, bringing you the latest in tech, gaming, and internet culture without the corporate fluff.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <button
                            onClick={handleStart}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-lg hover:scale-105 transition-transform gap-2 w-full sm:w-auto hover:shadow-xl hover:shadow-brand/20"
                        >
                            Start Scrolling <ArrowRight className="w-5 h-5" />
                        </button>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-semibold text-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors w-full sm:w-auto"
                        >
                            Meet the Team
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                    {[
                        {
                            icon: <Zap className="w-6 h-6 text-yellow-500" />,
                            title: "Tech & Future",
                            description: "From AI updates to the next big startup. We break down what matters, minus the jargon.",
                            bg: "bg-yellow-500/10"
                        },
                        {
                            icon: <Gamepad2 className="w-6 h-6 text-brand" />,
                            title: "Gaming & Culture",
                            description: "Reviews, esports, and the games you're actually playing. No filler.",
                            bg: "bg-brand/10"
                        },
                        {
                            icon: <Globe2 className="w-6 h-6 text-purple-500" />,
                            title: "World & Life",
                            description: "Career advice, finance for our generation, and the global news you need to know.",
                            bg: "bg-purple-500/10"
                        }
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-3xl bg-gray-50/50 dark:bg-dark-surface/50 border border-gray-100 dark:border-white/5 hover:border-brand/30 dark:hover:border-brand/30 transition-colors group"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="mt-32 p-12 text-center rounded-3xl bg-gradient-to-b from-gray-50 to-white dark:from-dark-surface/50 dark:to-transparent border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                            Ready to dive in?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                            Join thousands of others getting their late-night dopamine fix the right way.
                        </p>
                        <button
                            onClick={handleStart}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand text-white font-semibold text-lg hover:bg-brand-dark transition-colors gap-2 hover:shadow-lg hover:shadow-brand/30"
                        >
                            Go to Homepage <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

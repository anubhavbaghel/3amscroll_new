"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="text-center max-w-xl">
                <div className="mb-8">
                    <span className="text-brand font-bold tracking-widest uppercase text-sm">404 Error</span>
                    <h1 className="text-6xl md:text-8xl font-black mt-4 font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-500">
                        Lost in the Scroll?
                    </h1>
                </div>
                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
                    The page you're looking for has drifted off into the late-night void. Let's get you back to the trending stories.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-dark text-white rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-brand/20"
                    >
                        <MoveLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <Link
                        href="/trending"
                        className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-full font-bold transition-all"
                    >
                        Explore Trending
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl" />
            </div>
        </div>
    );
}

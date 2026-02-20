"use client";

import { useEffect } from "react";
import { RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="text-center max-w-xl">
                <div className="mb-8">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-sm">System Error</span>
                    <h1 className="text-5xl md:text-7xl font-black mt-4 font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                        Something Broke.
                    </h1>
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto">
                    A technical glitch interrupted the scroll. We've logged the error, but you might want to try refreshing the page.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-dark text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand/20"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-full font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import dynamic from "next/dynamic";

export const DynamicSearchPageContent = dynamic(
    () => import("./SearchPageContent").then((mod) => mod.SearchPageContent),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen pt-44 flex justify-center animate-pulse">
                <div className="w-full max-w-4xl h-20 bg-gray-100 dark:bg-gray-900 rounded-3xl mx-4" />
            </div>
        )
    }
);

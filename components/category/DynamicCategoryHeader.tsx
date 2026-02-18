"use client";

import dynamic from "next/dynamic";

export const DynamicCategoryHeader = dynamic(
    () => import("./CategoryHeader").then((mod) => mod.CategoryHeader),
    {
        ssr: true,
        loading: () => <div className="h-48 w-full bg-gray-100 dark:bg-gray-900 animate-pulse rounded-2xl mb-12" />
    }
);

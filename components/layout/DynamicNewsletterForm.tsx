"use client";

import dynamic from "next/dynamic";

const NewsletterForm = dynamic(
    () => import("./NewsletterForm").then((mod) => mod.NewsletterForm),
    { ssr: false, loading: () => <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" /> }
);

export function DynamicNewsletterForm() {
    return <NewsletterForm />;
}

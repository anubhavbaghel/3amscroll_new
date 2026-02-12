"use client";

import { useState, useTransition } from "react";
import { toggleBookmark } from "@/app/actions/bookmark";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
    articleId: string;
    initialIsBookmarked?: boolean;
    className?: string;
}

export function BookmarkButton({ articleId, initialIsBookmarked = false, className = "" }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Optimistic UI update
        const previousState = isBookmarked;
        setIsBookmarked(!isBookmarked);

        startTransition(async () => {
            const result = await toggleBookmark(articleId);

            if (result.error) {
                // Revert on error
                setIsBookmarked(previousState);
                if (result.error.includes("logged in")) {
                    router.push("/login");
                }
            } else {
                // Sync with server result just in case
                // setIsBookmarked(result.isBookmarked); 
                // Actually result.isBookmarked might be undefined if I didn't return it strictly correct in complex cases, 
                // but !existing logic in actions was fine.
            }
        });
    };

    return (
        <button
            onClick={handleToggle}
            className={`transition-colors pointer-events-auto relative z-20 p-1.5 -m-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${isBookmarked ? "text-blue-600 dark:text-blue-400" : "text-gray-400 hover:text-blue-600"
                } ${className}`}
            aria-label={isBookmarked ? "Remove from saved" : "Save article"}
            disabled={isPending}
        >
            <svg
                className={`w-5 h-5 ${isBookmarked ? "fill-current" : "fill-none"}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
            </svg>
        </button>
    );
}

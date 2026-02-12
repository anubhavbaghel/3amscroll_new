"use client";

import { useState, useTransition } from "react";
import { toggleLike } from "@/app/actions/like";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
    articleId: string;
    initialLikes: number;
    initialIsLiked?: boolean;
    className?: string;
}

export function LikeButton({ articleId, initialLikes, initialIsLiked = false, className = "" }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Optimistic UI update
        const previousLiked = isLiked;
        const previousCount = likesCount;

        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

        startTransition(async () => {
            const result = await toggleLike(articleId);

            if (result.error) {
                // Revert on error
                setIsLiked(previousLiked);
                setLikesCount(previousCount);
                if (result.error.includes("logged in")) {
                    router.push("/login");
                }
            }
        });
    };

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center gap-1 hover:text-red-500 transition-colors ${isLiked ? "text-red-500" : "text-gray-500"
                } ${className}`}
            disabled={isPending}
        >
            <svg
                className={`w-4 h-4 ${isLiked ? "fill-current" : "fill-none"}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            {likesCount}
        </button>
    );
}

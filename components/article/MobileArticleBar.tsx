"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleLike } from "@/app/actions/like";
import { toggleBookmark } from "@/app/actions/bookmark";
import { ShareButton } from "@/components/article/ShareButton";

interface MobileArticleBarProps {
    articleId: string;
    articleTitle: string;
    articleExcerpt?: string;
    articleSlug: string;
    initialLikes: number;
    initialIsLiked: boolean;
    initialIsBookmarked: boolean;
    commentsCount: number;
    onCommentClick?: () => void;
}

export function MobileArticleBar({
    articleId,
    articleTitle,
    articleExcerpt,
    articleSlug,
    initialLikes,
    initialIsLiked,
    initialIsBookmarked,
    commentsCount,
    onCommentClick,
}: MobileArticleBarProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    const [isPendingLike, startLikeTransition] = useTransition();
    const [isPendingBookmark, startBookmarkTransition] = useTransition();
    const router = useRouter();

    const handleLike = () => {
        const prev = { isLiked, likesCount };
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

        startLikeTransition(async () => {
            const result = await toggleLike(articleId);
            if (result.error) {
                setIsLiked(prev.isLiked);
                setLikesCount(prev.likesCount);
                if (result.error.includes("logged in")) router.push("/login");
            }
        });
    };

    const handleBookmark = () => {
        const prev = isBookmarked;
        setIsBookmarked(!isBookmarked);

        startBookmarkTransition(async () => {
            const result = await toggleBookmark(articleId);
            if (result.error) {
                setIsBookmarked(prev);
                if (result.error.includes("logged in")) router.push("/login");
            }
        });
    };

    const articleUrl = `https://3amscroll.com/article/${articleSlug}`;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            {/* Blur backdrop */}
            <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-around px-2 py-2 pb-safe">

                    {/* Applaud / Like */}
                    <button
                        onClick={handleLike}
                        disabled={isPendingLike}
                        className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all active:scale-90"
                        aria-label="Applaud"
                    >
                        <span className={`text-xl transition-all ${isLiked ? "scale-110" : ""}`}>
                            {isLiked ? "👏" : "👏"}
                        </span>
                        <span className={`text-[10px] font-medium tabular-nums ${isLiked ? "text-brand" : "text-gray-500 dark:text-gray-400"}`}>
                            {likesCount > 0 ? likesCount.toLocaleString() : "Applaud"}
                        </span>
                    </button>

                    {/* Comment */}
                    <button
                        onClick={onCommentClick}
                        className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all active:scale-90"
                        aria-label="Comment"
                    >
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                            {commentsCount > 0 ? commentsCount : "Comment"}
                        </span>
                    </button>

                    {/* Bookmark */}
                    <button
                        onClick={handleBookmark}
                        disabled={isPendingBookmark}
                        className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all active:scale-90"
                        aria-label="Bookmark"
                    >
                        <svg
                            className={`w-5 h-5 transition-colors ${isBookmarked ? "text-brand fill-current" : "text-gray-600 dark:text-gray-400 fill-none"}`}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span className={`text-[10px] font-medium ${isBookmarked ? "text-brand" : "text-gray-500 dark:text-gray-400"}`}>
                            {isBookmarked ? "Saved" : "Save"}
                        </span>
                    </button>

                    {/* Share */}
                    <div className="flex flex-col items-center gap-0.5 px-4 py-2">
                        <ShareButton
                            title={articleTitle}
                            excerpt={articleExcerpt}
                            url={articleUrl}
                            className="text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
                        />
                        <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Share</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

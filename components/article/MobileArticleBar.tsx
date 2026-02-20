"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Hand, MessageSquare, Bookmark, Share2 } from "lucide-react";
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
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pointer-events-none">
            {/* Height-constrained container to avoid blocking content above it */}
            <div className="flex flex-col items-center">
                <div className="w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-gray-200/60 dark:border-white/5 pointer-events-auto shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between max-w-md mx-auto px-6 h-14 pb-safe">

                        <div className="flex items-center gap-6">
                            {/* Applaud / Like */}
                            <button
                                onClick={handleLike}
                                disabled={isPendingLike}
                                className="flex items-center gap-2 py-2 group transition-all active:scale-90"
                                aria-label="Applaud"
                            >
                                <Hand
                                    className={`w-[22px] h-[22px] transition-all duration-300 ${isLiked ? "text-brand fill-brand" : "text-gray-500 dark:text-gray-400"
                                        }`}
                                    strokeWidth={1.5}
                                />
                                {likesCount > 0 && (
                                    <span className={`text-[13px] font-medium tabular-nums ${isLiked ? "text-brand" : "text-gray-500 dark:text-gray-400"}`}>
                                        {likesCount.toLocaleString()}
                                    </span>
                                )}
                            </button>

                            {/* Comment */}
                            <button
                                onClick={onCommentClick}
                                className="flex items-center gap-2 py-2 group transition-all active:scale-90"
                                aria-label="Comment"
                            >
                                <MessageSquare
                                    className="w-[22px] h-[22px] text-gray-500 dark:text-gray-400 transition-colors group-hover:text-brand"
                                    strokeWidth={1.5}
                                />
                                {commentsCount > 0 && (
                                    <span className="text-[13px] font-medium text-gray-500 dark:text-gray-400 transition-colors group-hover:text-brand">
                                        {commentsCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Bookmark */}
                            <button
                                onClick={handleBookmark}
                                disabled={isPendingBookmark}
                                className="flex items-center py-2 group transition-all active:scale-90"
                                aria-label="Bookmark"
                            >
                                <Bookmark
                                    className={`w-[22px] h-[22px] transition-all duration-300 ${isBookmarked ? "text-brand fill-brand" : "text-gray-500 dark:text-gray-400 group-hover:text-brand"
                                        }`}
                                    strokeWidth={1.5}
                                />
                            </button>

                            {/* Share */}
                            <div className="flex items-center group transition-all active:scale-90">
                                <ShareButton
                                    title={articleTitle}
                                    excerpt={articleExcerpt}
                                    url={articleUrl}
                                    className="text-gray-500 dark:text-gray-400 hover:text-brand transition-colors p-0"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

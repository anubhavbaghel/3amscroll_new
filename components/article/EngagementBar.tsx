"use client";

import { useState } from "react";

interface EngagementBarProps {
    likes: number;
    comments: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
}

export function EngagementBar({
    likes,
    comments,
    isLiked = false,
    isBookmarked = false
}: EngagementBarProps) {
    const [liked, setLiked] = useState(isLiked);
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = () => {
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setLiked(!liked);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Share failed:", err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${liked
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                                }`}
                        >
                            <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>{formatNumber(likeCount)}</span>
                        </button>

                        {/* Comment Button */}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{formatNumber(comments)}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Bookmark Button */}
                        <button
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`p-2 rounded-lg transition-colors ${bookmarked
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                                }`}
                            aria-label="Bookmark"
                        >
                            <svg className="w-5 h-5" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>

                        {/* Share Button */}
                        <button
                            onClick={handleShare}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Share"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

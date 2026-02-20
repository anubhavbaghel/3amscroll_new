"use client";

import Link from "next/link";
import Image from "next/image";
import { Author } from "@/types";

interface AuthorCardDetailedProps {
    author: Author;
    followersCount?: number;
}

export function AuthorCardDetailed({ author, followersCount = 0 }: AuthorCardDetailedProps) {
    const displayFollowers = followersCount > 1000
        ? `${(followersCount / 1000).toFixed(1)}K`
        : followersCount.toString();

    return (
        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-10 my-12">
            {/* Header row - centralized alignment */}
            <div className="flex items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-5 min-w-0">
                    {/* Avatar */}
                    <Link href={`/author/${author.id}`} className="shrink-0">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800 shadow-sm">
                            {author.avatar ? (
                                <Image
                                    src={author.avatar}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-brand flex items-center justify-center text-white font-bold text-2xl">
                                    {author.name?.[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Name + stats */}
                    <div className="min-w-0">
                        <Link
                            href={`/author/${author.id}`}
                            className="font-bold text-xl text-gray-900 dark:text-white hover:text-brand transition-colors leading-none block mb-1"
                        >
                            {author.name}
                        </Link>

                        {followersCount > 0 && (
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
                                {displayFollowers} followers
                            </p>
                        )}
                    </div>
                </div>

                <button className="shrink-0 text-sm font-bold px-6 py-2.5 rounded-full bg-brand text-white hover:bg-brand/90 transition-all shadow-md shadow-brand/20 active:scale-95">
                    Follow
                </button>
            </div>

            {/* More from author link */}
            <Link
                href={`/author/${author.id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:gap-3 transition-all"
            >
                More from {author.name}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}

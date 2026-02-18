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
        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-8 my-10">
            {/* Header row */}
            <div className="flex items-start gap-4 mb-5">
                {/* Avatar */}
                <Link href={`/author/${author.id}`} className="shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
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

                {/* Name + stats + follow */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <Link
                                href={`/author/${author.id}`}
                                className="font-bold text-lg text-gray-900 dark:text-white hover:text-brand transition-colors leading-tight"
                            >
                                {author.name}
                            </Link>
                            {followersCount > 0 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                    {displayFollowers} followers
                                </p>
                            )}
                        </div>
                        <button className="shrink-0 text-sm font-semibold px-5 py-2 rounded-full bg-brand text-white hover:bg-brand/90 transition-colors">
                            Follow
                        </button>
                    </div>
                </div>
            </div>

            {/* Bio */}
            {author.bio && (
                <p className="text-[0.9375rem] text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {author.bio}
                </p>
            )}

            {/* More from author link */}
            <Link
                href={`/author/${author.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:opacity-75 transition-opacity"
            >
                More from {author.name}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}

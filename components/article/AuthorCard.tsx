"use client";

import Link from "next/link";
import Image from "next/image";
import { Author } from "@/types";

interface AuthorCardProps {
    author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
    return (
        <div className="py-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
                Written by
            </p>
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <Link href={`/author/${author.id}`} className="shrink-0">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 ring-2 ring-gray-100 dark:ring-gray-800">
                        {author.avatar ? (
                            <Image
                                src={author.avatar}
                                alt={author.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-brand flex items-center justify-center text-white font-bold text-xl">
                                {author.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <Link
                        href={`/author/${author.id}`}
                        className="font-bold text-lg text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand transition-colors"
                    >
                        {author.name}
                    </Link>

                    {author.bio && (
                        <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                            {author.bio}
                        </p>
                    )}

                    <Link
                        href={`/author/${author.id}`}
                        className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-brand hover:opacity-75 transition-opacity"
                    >
                        More from {author.name.split(" ")[0]}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

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

            {/* Bio */}
            {author.bio && (
                <p className="text-gray-600 dark:text-gray-400 text-[1rem] leading-relaxed mb-6 font-medium">
                    {author.bio}
                </p>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-8">
                {author.social?.twitter && (
                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                    </a>
                )}
                {author.social?.instagram && (
                    <a href={author.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand transition-colors">
                        <span className="sr-only">Instagram</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                )}
                {author.social?.linkedin && (
                    <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                )}
                {author.social?.website && (
                    <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand transition-colors">
                        <span className="sr-only">Website</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </a>
                )}
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

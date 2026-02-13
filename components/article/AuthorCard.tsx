"use client";

import Link from "next/link";
import Image from "next/image";
import { routes } from "@/config/routes";

interface AuthorCardProps {
    author: string;
    authorId: string;
    avatar?: string;
    bio?: string;
    articlesCount?: number;
}

export function AuthorCard({ author, authorId, avatar, bio, articlesCount = 0 }: AuthorCardProps) {
    return (
        <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-display">
                About the Author
            </h3>

            <div className="flex items-start gap-4 mb-4">
                <Link href={routes.author(authorId)} className="group flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-transparent group-hover:border-brand transition-colors">
                        {avatar ? (
                            <Image src={avatar} alt={author} fill className="object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand font-bold text-xl">
                                {author.charAt(0)}
                            </div>
                        )}
                    </div>
                </Link>
                <div className="flex-1 min-w-0">
                    <Link href={routes.author(authorId)} className="block">
                        <h4 className="font-bold text-lg mb-1 hover:text-brand transition-colors">{author}</h4>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {articlesCount} articles published
                    </p>
                </div>
            </div>

            {bio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {bio}
                </p>
            )}

            <button className="w-full px-4 py-2 bg-brand text-white font-medium rounded-xl hover:bg-brand-dark transition-colors text-sm shadow-lg shadow-brand/20">
                Follow
            </button>
        </div>
    );
}

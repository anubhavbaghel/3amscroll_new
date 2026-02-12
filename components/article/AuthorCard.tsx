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
        <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                About the Author
            </h3>

            <div className="flex items-start gap-4 mb-4">
                <Link href={routes.author(authorId)} className="group flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                        {avatar ? (
                            <Image src={avatar} alt={author} fill className="object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xl">
                                {author.charAt(0)}
                            </div>
                        )}
                    </div>
                </Link>
                <div className="flex-1 min-w-0">
                    <Link href={routes.author(authorId)} className="block">
                        <h4 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors">{author}</h4>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {articlesCount} articles published
                    </p>
                </div>
            </div>

            {bio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {bio}
                </p>
            )}

            <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Follow
            </button>
        </div>
    );
}

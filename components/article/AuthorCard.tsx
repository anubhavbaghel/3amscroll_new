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

export function AuthorCard({ author, authorId, avatar, bio }: AuthorCardProps) {
    return (
        <div className="py-6">
            <Link href={routes.author(authorId)} className="flex items-center gap-4 group">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={author}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand font-bold text-xl">
                            {author.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Written by</div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                        {author}
                    </h4>
                    {bio && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {bio}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
}

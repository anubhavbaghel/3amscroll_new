"use client";

import Link from "next/link";
import Image from "next/image";
import { Author } from "@/types";

interface AuthorCardProps {
    author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
    return (
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
            <Link href={`/author/${author.id}`} className="flex items-center gap-4 group">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                    />
                </div>
                <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Written by</div>
                    <div className="font-semibold text-lg group-hover:text-brand transition-colors">
                        {author.name}
                    </div>
                    {author.bio && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {author.bio}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
}

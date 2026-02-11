"use client";

interface AuthorCardProps {
    author: string;
    avatar?: string;
    bio?: string;
    articlesCount?: number;
}

export function AuthorCard({ author, bio, articlesCount = 0 }: AuthorCardProps) {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                About the Author
            </h3>

            <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-1">{author}</h4>
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

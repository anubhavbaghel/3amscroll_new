import { Author } from "@/types";
import { MapPin, Globe, Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

interface AuthorProfileHeaderProps {
    author: Author;
    stats: {
        articles: number;
        views: number;
        likes: number;
    };
}

export function AuthorProfileHeader({ author, stats }: AuthorProfileHeaderProps) {
    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                    {/* Avatar */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-950 shadow-lg"
                        />
                        {/* Optional: Verified Badge */}
                        <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white dark:border-gray-950">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="mb-4">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{author.name}</h1>
                            {author.role && (
                                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                                    {author.role}
                                </p>
                            )}
                            {author.location && (
                                <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm text-gray-500">
                                    <MapPin className="w-4 h-4" />
                                    <span>{author.location}</span>
                                </div>
                            )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                            {author.bio}
                        </p>

                        {/* Social Links */}
                        {author.social && (
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                                {author.social.twitter && (
                                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {author.social.linkedin && (
                                    <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {author.social.website && (
                                    <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
                                        <Globe className="w-5 h-5" />
                                    </a>
                                )}
                                {author.social.instagram && (
                                    <a href={author.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-pink-50 hover:text-pink-500 transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 border-t border-gray-200 dark:border-gray-800 pt-6">
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {stats.articles}
                                </div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">Articles</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {(stats.views / 1000).toFixed(1)}k
                                </div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">Views</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {(stats.likes / 1000).toFixed(1)}k
                                </div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">Likes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

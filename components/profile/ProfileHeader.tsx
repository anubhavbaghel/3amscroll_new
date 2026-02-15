"use client";

import { User } from "@/types";
import { useState } from "react";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileHeaderProps {
    user: User;
    isOwnProfile: boolean;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="relative mb-20">
            {/* Banner */}
            <div className="h-48 md:h-64 w-full bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden relative group">
                {user.banner ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.banner}
                        alt="Profile Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-dark to-black opacity-80" />
                )}

                {isOwnProfile && (
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Avatar & Info */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">

                    {/* Avatar - Negative margin to pull up over banner */}
                    <div className="relative group -mt-16 md:-mt-20 shrink-0">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-black bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-xl">
                            {user.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-brand text-white text-4xl font-bold">
                                    {user.name?.[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Info */}
                    <div className="flex-1 pb-2 text-center md:text-left pt-0 md:pt-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
                            {user.name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">@{user.username || user.email.split('@')[0]}</p>

                        {user.bio && (
                            <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-2xl text-sm md:text-base leading-relaxed">
                                {user.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.location && (
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {user.location}
                                </span>
                            )}
                            {user.website && (
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    Website
                                </a>
                            )}
                            {user.joinedAt && (
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Joined {new Date(user.joinedAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>

                        {/* Actions (Mobile Edit Button) inside text flow */}
                        {isOwnProfile && (
                            <div className="md:hidden w-full mt-6">
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />
        </div>
    );
}

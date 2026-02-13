"use client";

import Link from "next/link";
import { signout } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

interface AuthButtonProps {
    user: User | null;
}

export function AuthButton({ user }: AuthButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return (
            <Link
                href="/login"
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full text-sm hover:opacity-80 transition-opacity"
            >
                Login
            </Link>
        );
    }

    return (
        <div className="relative">
            {/* User Dropdown */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-glow flex items-center justify-center text-white font-bold text-sm shadow-md shadow-brand/20 ring-2 ring-white dark:ring-dark-bg">
                    {user.email?.[0].toUpperCase()}
                </div>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop for mobile to close */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-dark-surface backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 dark:border-dark-border py-2 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-border/50">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Signed in as</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" title={user.email}>
                                {user.email}
                            </p>
                        </div>

                        <div className="p-1">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Profile</span>
                            </Link>
                            <Link
                                href="/saved"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Saved Stories</span>
                            </Link>
                        </div>

                        <div className="border-t border-gray-100 dark:border-dark-border/50 p-1 mt-1">
                            <form action={signout}>
                                <button
                                    type="submit"
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                >
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

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
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.email?.[0].toUpperCase()}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-950 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                        onClick={() => setIsOpen(false)}
                    >
                        Profile
                    </Link>
                    <Link
                        href="/saved"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                        onClick={() => setIsOpen(false)}
                    >
                        Saved
                    </Link>
                    <button
                        onClick={() => signout()}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}

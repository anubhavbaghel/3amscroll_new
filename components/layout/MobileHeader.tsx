"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { User } from "@supabase/supabase-js";
import { AuthButton } from "@/components/auth/AuthButton";

import { CategoryNav } from "./CategoryNav";

interface MobileHeaderProps {
    user?: User | null;
}

export function MobileHeader({ user = null }: MobileHeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-border transition-colors lg:hidden">
            <div className="flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Link href={routes.home} className="font-bold text-2xl tracking-tighter hover:text-brand transition-colors font-logo text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    3AM SCROLL
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Auth Button */}
                    <div className="flex items-center">
                        <AuthButton user={user} />
                    </div>
                </div>
            </div>

            {/* Category Pills (Horizontal Scroll) */}
            <div className="pt-2 pb-3">
                <CategoryNav />
            </div>
        </header>
    );
}

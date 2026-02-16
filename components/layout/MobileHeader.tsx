"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { User } from "@supabase/supabase-js";
import { AuthButton } from "@/components/auth/AuthButton";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
    user?: User | null;
}

function CategoryLink({ href, label }: { href: string; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                isActive
                    ? "bg-brand text-white shadow-md shadow-brand/20 font-semibold"
                    : "bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-brand dark:hover:border-brand hover:text-brand"
            )}
        >
            {label}
        </Link>
    );
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
            <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md border-b border-gray-100 dark:border-dark-border">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3 px-4 md:px-6">
                    <CategoryLink href={routes.home} label="For You" />
                    <CategoryLink href={routes.trending} label="Trending" />
                    <div className="w-px h-6 bg-gray-200 dark:bg-dark-border mx-1 my-auto flex-shrink-0" />
                    {siteConfig.categories.map((category) => (
                        <CategoryLink
                            key={category.id}
                            href={routes.category(category.slug)}
                            label={category.name}
                        />
                    ))}
                    {/* Right padding spacer to safely see the last item */}
                    <div className="w-4 flex-shrink-0" />
                </div>
            </div>
        </header>
    );
}

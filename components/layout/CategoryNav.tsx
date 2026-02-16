"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp } from "lucide-react";

interface CategoryNavProps {
    className?: string;
}

function NavItem({ href, label, icon: Icon, isActive }: { href: string; label: string; icon?: React.ElementType; isActive: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden flex-shrink-0",
                isActive
                    ? "text-white dark:text-gray-900 bg-gray-900 dark:bg-gray-100 shadow-md transform scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-white/5"
            )}
        >
            {Icon && (
                <Icon className={cn("w-3.5 h-3.5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
            )}
            <span className="relative z-10">{label}</span>
        </Link>
    );
}

export function CategoryNav({ className }: CategoryNavProps) {
    const pathname = usePathname();

    const isHome = pathname === routes.home;
    const isTrending = pathname === routes.trending;

    return (
        <div className={cn("flex items-center gap-1 overflow-x-auto scrollbar-hide py-2 px-4 md:px-0 mask-linear-fade", className)}>
            <NavItem
                href={routes.home}
                label="For You"
                icon={Sparkles}
                isActive={isHome}
            />
            <NavItem
                href={routes.trending}
                label="Trending"
                icon={TrendingUp}
                isActive={isTrending}
            />

            <div className="w-px h-5 bg-gray-200 dark:bg-white/10 mx-2 flex-shrink-0" />

            {siteConfig.categories.map((category) => {
                const isActive = pathname === routes.category(category.slug);
                return (
                    <NavItem
                        key={category.id}
                        href={routes.category(category.slug)}
                        label={category.name}
                        isActive={isActive}
                    />
                );
            })}

            {/* Right padding spacer */}
            <div className="w-6 flex-shrink-0 md:hidden" />
        </div>
    );
}

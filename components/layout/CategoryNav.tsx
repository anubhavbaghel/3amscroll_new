"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryNavProps {
    className?: string;
}

function NavItem({ href, label, icon: Icon, isActive }: { href: string; label: string; icon?: React.ElementType; isActive: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium relative flex-shrink-0 transition-colors duration-200",
                isActive
                    ? "text-white dark:text-gray-900"
                    : "text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-white/5"
            )}
        >
            {isActive && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gray-900 dark:bg-gray-100 rounded-full shadow-lg z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
            )}
            {Icon && (
                <Icon className={cn("w-4 h-4 relative z-10 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")} />
            )}
            <span className="relative z-10 whitespace-nowrap">{label}</span>
        </Link>
    );
}

export function CategoryNav({ className }: CategoryNavProps) {
    const pathname = usePathname();

    const isHome = pathname === routes.home;

    return (
        <div className={cn("flex justify-center w-full py-4 px-6", className)}>
            <motion.div
                layout
                className="flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-1 rounded-full backdrop-blur-md relative shadow-sm"
            >
                <Link
                    href={routes.home}
                    className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full relative flex-shrink-0 transition-colors duration-200",
                        isHome
                            ? "text-white dark:text-gray-900"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10"
                    )}
                    title="Home"
                >
                    {isHome && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-gray-900 dark:bg-gray-100 rounded-full shadow-lg z-0"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                    )}
                    <Home className="w-5 h-5 relative z-10" />
                </Link>

                <div className="w-px h-5 bg-gray-300 dark:bg-white/20 mx-1 flex-shrink-0" />

                <motion.div layout className="flex items-center gap-1 overflow-visible">
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
                </motion.div>
            </motion.div>
        </div>
    );
}

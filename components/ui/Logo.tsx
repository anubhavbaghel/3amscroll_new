import Link from "next/link";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "default" | "large" | "small";
}

export function Logo({ className, variant = "default" }: LogoProps) {
    const sizeClasses = {
        small: "text-lg",
        default: "text-2xl",
        large: "text-4xl md:text-5xl",
    };

    return (
        <Link
            href={routes.home}
            className={cn(
                "font-logo font-bold tracking-tighter hover:text-brand transition-colors text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400",
                sizeClasses[variant],
                className
            )}
        >
            3AM SCROLL
        </Link>
    );
}

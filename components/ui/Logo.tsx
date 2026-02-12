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
                "font-display font-bold tracking-tight hover:text-blue-600 transition-colors relative group",
                sizeClasses[variant],
                className
            )}
        >
            <span className="relative z-10">3AM SCROLL</span>
            <span className="absolute -inset-1 bg-blue-100 dark:bg-blue-900/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-0" />
        </Link>
    );
}

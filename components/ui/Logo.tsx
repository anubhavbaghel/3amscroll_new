import Link from "next/link";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "default" | "large" | "small";
}

export function Logo({ className, variant = "default" }: LogoProps) {
    const sizeClasses = {
        small: "w-24",
        default: "w-36",
        large: "w-56 md:w-64",
    };

    return (
        <Link
            href={routes.home}
            className={cn("inline-block transition-transform hover:scale-[1.02]", className)}
        >
            <svg
                viewBox="0 0 320 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("block", sizeClasses[variant])}
            >
                <text
                    x="115"
                    y="45"
                    style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontWeight: 900,
                        fontSize: '38px',
                        letterSpacing: '-0.02em',
                    }}
                    className="fill-black dark:fill-transparent dark:stroke-white dark:stroke-[1.5px] transition-colors"
                >
                    3AM
                </text>
                <text
                    x="10"
                    y="110"
                    style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontWeight: 900,
                        fontSize: '85px',
                        letterSpacing: '-0.04em',
                    }}
                    className="fill-[#8E8E8E]"
                >
                    Scroll
                </text>
            </svg>
        </Link>
    );
}

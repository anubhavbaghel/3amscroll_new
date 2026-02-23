"use client";

import { use3AMMode } from "@/context/ThreemAMModeContext";

export function ThreemAMModeToggle({ className = "" }: { className?: string }) {
    const { is3AMMode, toggle3AMMode } = use3AMMode();

    return (
        <button
            onClick={toggle3AMMode}
            title={is3AMMode ? "Switch to Day Mode" : "Enter 3AM Mode"}
            aria-label={is3AMMode ? "Switch to Day Mode" : "Enter 3AM Mode"}
            className={`relative group flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-500 ${is3AMMode
                    ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "border-gray-200 dark:border-white/10 bg-transparent text-gray-500 dark:text-slate-400 hover:border-primary/30 hover:text-primary"
                } ${className}`}
        >
            {/* Animated Icon */}
            <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
                {is3AMMode ? (
                    /* Moon icon - 3AM active */
                    <svg
                        className="w-4 h-4 text-primary transition-transform duration-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                ) : (
                    /* Sun icon - Day mode */
                    <svg
                        className="w-4 h-4 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                )}
                {/* Neon pulse ring - only in 3AM mode */}
                {is3AMMode && (
                    <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                )}
            </span>

            {/* Label */}
            <span className="text-[10px] font-black uppercase tracking-[0.15em] hidden xl:block">
                {is3AMMode ? "3AM" : "Day"}
            </span>
        </button>
    );
}

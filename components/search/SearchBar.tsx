"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    className?: string;
    onSearch?: () => void;
    autoFocus?: boolean;
}

export function SearchBar({ className, onSearch, autoFocus = false }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");

    // Initialize query from URL
    useEffect(() => {
        const q = searchParams?.get("q");
        if (q) {
            setQuery(q);
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            onSearch?.();
        }
    };

    const clearSearch = () => {
        setQuery("");
        // Optional: Redirect to base search page or stay
    };

    return (
        <form onSubmit={handleSearch} className={cn("relative", className)}>
            <div className="relative">
                <input
                    type="search"
                    placeholder="Search articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                    autoFocus={autoFocus}
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>
                )}
            </div>
        </form>
    );
}

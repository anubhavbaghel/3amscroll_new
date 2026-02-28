"use client";

import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";

interface MediumImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

export function MediumImage({ src, alt, width = 1200, height = 800, className }: MediumImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure className={clsx("relative w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 my-10", className)}>
            <div
                className="relative w-full"
                // Aspect ratio box to prevent layout shift
                style={{ aspectRatio: `${width} / ${height}` }}
            >
                {/* Skeleton Loader Background */}
                <div
                    className={clsx(
                        "absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse transition-opacity duration-500",
                        isLoading ? "opacity-100" : "opacity-0"
                    )}
                />

                {/* Optimized Next.js Image */}
                <Image
                    src={src}
                    alt={alt || "Article Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    className={clsx(
                        "object-cover transition-opacity duration-700 ease-in-out",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={() => setIsLoading(false)}
                    unoptimized={src.startsWith('data:')} // Allow base64 data URIs
                />
            </div>
            {/* Optional caption parsing could go here */}
        </figure>
    );
}

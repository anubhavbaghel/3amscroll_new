"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Twitter, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";
import { sendGAEvent } from "@next/third-parties/google";

interface ShareButtonProps {
    title: string;
    url?: string;
    excerpt?: string;
    className?: string;
    showLabel?: boolean;
}

export function ShareButton({ title, url, excerpt, className = "", showLabel = false }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Use current URL if not provided
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    // Premium formatting: *Bold Title* \n\n Excerpt \n\n Read full story here:
    const shareText = excerpt
        ? `*${title}*\n\n${excerpt}\n\nRead the full story here:\n${shareUrl}`
        : `*${title}*\n\nRead the full story here:\n${shareUrl}`;

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Use native Web Share API if available (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: shareText, // Now includes title, excerpt, CTA, and URL
                });
                sendGAEvent({ event: 'share_article', value: 'native', label: title });
            } catch (err) {
                // User cancelled — not an error
                if ((err as Error).name !== "AbortError") {
                    console.error("Share failed:", err);
                }
            }
            return;
        }

        // Desktop: toggle dropdown
        setIsOpen((prev) => !prev);
    };

    const copyLink = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            sendGAEvent({ event: 'share_article', value: 'copy_link', label: title });
            setTimeout(() => {
                setCopied(false);
                setIsOpen(false);
            }, 1500);
        } catch {
            toast.error("Failed to copy link");
        }
    };

    const shareToTwitter = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Twitter doesn't like forced bolding/newlines as much, but we'll stick to a cleaner version
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank", "noopener,noreferrer");
        sendGAEvent({ event: 'share_article', value: 'twitter', label: title });
        setIsOpen(false);
    };

    const shareToWhatsApp = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        sendGAEvent({ event: 'share_article', value: 'whatsapp', label: title });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleShare}
                className={`flex items-center gap-2 transition-colors pointer-events-auto relative z-20 ${className}`}
                aria-label="Share article"
                title="Share"
            >
                <Share2 className="w-5 h-5" />
                {showLabel && <span className="text-sm font-medium">Share</span>}
            </button>

            {/* Dropdown (desktop fallback) */}
            {isOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-52 bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl shadow-xl shadow-black/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-bottom-right">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Share via</p>

                    <button
                        onClick={copyLink}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Link2 className="w-4 h-4 text-gray-500" />
                        )}
                        {copied ? "Copied!" : "Copy link"}
                    </button>

                    <button
                        onClick={shareToTwitter}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                        Twitter / X
                    </button>

                    <button
                        onClick={shareToWhatsApp}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
}

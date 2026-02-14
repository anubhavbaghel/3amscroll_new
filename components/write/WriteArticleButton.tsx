"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/auth/LoginModal";
import { User } from "@supabase/supabase-js";

interface WriteArticleButtonProps {
    user?: User | null;
    className?: string; // Allow custom styling for desktop/mobile
    showIcon?: boolean;
    children?: React.ReactNode;
}

export function WriteArticleButton({ user, className, showIcon = true, children }: WriteArticleButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (user) {
            router.push("/write");
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={className}
            >
                {showIcon && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                )}
                {children || "Write"}
            </button>

            <LoginModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                redirectTo="/write"
            />
        </>
    );
}

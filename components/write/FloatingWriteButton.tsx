"use client";

import { WriteArticleButton } from "@/components/write/WriteArticleButton";
import { PenSquare } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface FloatingWriteButtonProps {
    user: User | null;
}

export function FloatingWriteButton({ user }: FloatingWriteButtonProps) {
    return (
        <div className="fixed bottom-24 right-4 z-40 lg:hidden">
            <WriteArticleButton
                user={user}
                className="p-4 bg-brand text-white rounded-full shadow-lg shadow-brand/30 hover:bg-brand-dark transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
                showIcon={false}
            >
                <PenSquare className="w-6 h-6" />
                <span className="sr-only">Write Article</span>
            </WriteArticleButton>
        </div>
    );
}

"use client";

import React from "react";
import { useFocusMode } from "@/context/FocusModeContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FocusModeViewProps {
    children: React.ReactNode;
}

export function FocusModeView({ children }: FocusModeViewProps) {
    const { isFocusMode } = useFocusMode();

    return (
        <div className={cn(
            "relative transition-all duration-1000",
            isFocusMode ? "bg-slate-950 text-slate-50" : "bg-white dark:bg-dark-bg"
        )}>
            {/* Ambient Background Glow (Only in Focus Mode) */}
            <AnimatePresence>
                {isFocusMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
                    >
                        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[180px] animate-pulse-subtle" />
                        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[180px] animate-pulse-subtle" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={cn(
                "relative z-10 transition-all duration-1000",
                isFocusMode ? "pt-32 pb-48" : ""
            )}>
                {children}
            </div>

            {/* Custom Focus Mode Progress Bar (Already in Navbar, but maybe extra subtle here) */}
        </div>
    );
}

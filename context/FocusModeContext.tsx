"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FocusModeContextType {
    isFocusMode: boolean;
    toggleFocusMode: () => void;
}

const FocusModeContext = createContext<FocusModeContextType | undefined>(undefined);

export function FocusModeProvider({ children }: { children: React.ReactNode }) {
    const [isFocusMode, setIsFocusMode] = useState(false);

    const toggleFocusMode = () => setIsFocusMode((prev) => !prev);

    // Lock body scroll partially or handle transitions if needed in the future
    useEffect(() => {
        if (isFocusMode) {
            document.documentElement.classList.add("focus-mode-active");
        } else {
            document.documentElement.classList.remove("focus-mode-active");
        }
    }, [isFocusMode]);

    return (
        <FocusModeContext.Provider value={{ isFocusMode, toggleFocusMode }}>
            {children}
        </FocusModeContext.Provider>
    );
}

export function useFocusMode() {
    const context = useContext(FocusModeContext);
    if (context === undefined) {
        // Safe fallback if used outside provider
        return { isFocusMode: false, toggleFocusMode: () => { } };
    }
    return context;
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThreemAMModeContextType {
    is3AMMode: boolean;
    toggle3AMMode: () => void;
}

const ThreemAMModeContext = createContext<ThreemAMModeContextType | undefined>(undefined);

const STORAGE_KEY = "3amscroll-mode";

export function ThreemAMModeProvider({ children }: { children: React.ReactNode }) {
    const [is3AMMode, setIs3AMMode] = useState(false);

    // On mount, restore from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        const active = saved === "3am";
        setIs3AMMode(active);
        if (active) {
            document.documentElement.classList.add("mode-3am");
        }
    }, []);

    const toggle3AMMode = () => {
        setIs3AMMode((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add("mode-3am");
                localStorage.setItem(STORAGE_KEY, "3am");
            } else {
                document.documentElement.classList.remove("mode-3am");
                localStorage.setItem(STORAGE_KEY, "day");
            }
            return next;
        });
    };

    return (
        <ThreemAMModeContext.Provider value={{ is3AMMode, toggle3AMMode }}>
            {children}
        </ThreemAMModeContext.Provider>
    );
}

export function use3AMMode() {
    const context = useContext(ThreemAMModeContext);
    if (context === undefined) {
        // Safe fallback - return no-op defaults if used outside provider
        return { is3AMMode: false, toggle3AMMode: () => { } };
    }
    return context;
}

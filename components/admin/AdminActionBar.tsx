"use client";

import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";

export function AdminActionBar() {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
                <h1 className="text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                    Manage Content
                </h1>
                <p className="text-slate-500 mt-1 font-medium text-sm">
                    Create, edit, and monitor all your digital publishing.
                </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button className="p-2 bg-white dark:bg-slate-700 shadow-sm rounded-lg text-primary">
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <List className="w-4 h-4" />
                    </button>
                </div>

                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-all">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </button>
            </div>
        </div>
    );
}

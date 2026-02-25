"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Stage1TrendSpotter } from "./Stage1TrendSpotter";
import { Stage2Writer } from "./Stage2Writer";
import { Stage3Humanizer } from "./Stage3Humanizer";
import { Stage4ImageGen } from "./Stage4ImageGen";
import { Stage5Publisher } from "./Stage5Publisher";

type Stage = 1 | 2 | 3 | 4 | 5;

// Shared state interface that will be passed down the pipeline
export interface WorkflowData {
    topicIdea: string; // The broad idea entered by the user
    workingTitle: string; // The specific title chosen from Stage 1
    seoKeyword: string; // The SEO keyword chosen from Stage 1
    rawDraft: string; // The AI-generated text from Stage 2
    humanizedDraft: string; // The final, anti-AI text from Stage 3
    imageUrl: string; // The Cloudflare/Supabase image URL from Stage 4
    slug: string; // SEO Slug
    excerpt: string; // Short excerpt
    category: string; // Article category
    seoTitle: string; // Meta title
    seoDescription: string; // Meta description
    coverImageAlt: string; // Alt text for cover image
}

export function WorkflowDashboard() {
    const [workflowData, setWorkflowData] = useState<WorkflowData>({
        topicIdea: "",
        workingTitle: "",
        seoKeyword: "",
        rawDraft: "",
        humanizedDraft: "",
        imageUrl: "",
        slug: "",
        excerpt: "",
        category: "tech",
        seoTitle: "",
        seoDescription: "",
        coverImageAlt: "",
    });
    const [isMounted, setIsMounted] = useState(false);

    // Hydrate state from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const savedData = localStorage.getItem("3amscroll-workflow-data");

        if (savedData) {
            try {
                // Merge with default values so new fields aren't undefined
                const parsed = JSON.parse(savedData);
                setWorkflowData(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to parse saved workflow data");
            }
        }
    }, []);

    // Persist state to localStorage whenever it changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("3amscroll-workflow-data", JSON.stringify(workflowData));
        }
    }, [workflowData, isMounted]);

    const clearWorkflow = () => {
        if (window.confirm("Are you sure you want to clear your current progress and start over?")) {
            localStorage.removeItem("3amscroll-workflow-data");
            setWorkflowData({
                topicIdea: "",
                workingTitle: "",
                seoKeyword: "",
                rawDraft: "",
                humanizedDraft: "",
                imageUrl: "",
                slug: "",
                excerpt: "",
                category: "tech",
                seoTitle: "",
                seoDescription: "",
                coverImageAlt: "",
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const updateData = (updates: Partial<WorkflowData>) => {
        setWorkflowData(prev => ({ ...prev, ...updates }));
    };

    return (
        <div className="bg-white dark:bg-dark-surface/30 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-xl mb-12">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4 sm:p-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light">
                    Prompt Engine Editor
                </h1>
                {isMounted && (
                    <button
                        onClick={clearWorkflow}
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Reset</span>
                    </button>
                )}
            </div>

            {/* Main Content Area - Vertical Flow */}
            <div className="p-6 sm:p-8 space-y-16 divide-y divide-white/5">
                <div className="pt-0">
                    <Stage1TrendSpotter
                        data={workflowData}
                        updateData={updateData}
                    />
                </div>
                <div className="pt-16">
                    <Stage2Writer
                        data={workflowData}
                        updateData={updateData}
                    />
                </div>
                <div className="pt-16">
                    <Stage3Humanizer
                        data={workflowData}
                        updateData={updateData}
                    />
                </div>
                <div className="pt-16">
                    <Stage4ImageGen
                        data={workflowData}
                        updateData={updateData}
                    />
                </div>
                {isMounted && (
                    <div className="pt-16">
                        <Stage5Publisher
                            data={workflowData}
                            updateData={updateData}
                        />
                    </div>
                )}
            </div>
        </div >
    );
}

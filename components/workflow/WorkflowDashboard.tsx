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
}

export function WorkflowDashboard() {
    const [currentStage, setCurrentStage] = useState<Stage>(1);
    const [workflowData, setWorkflowData] = useState<WorkflowData>({
        topicIdea: "",
        workingTitle: "",
        seoKeyword: "",
        rawDraft: "",
        humanizedDraft: "",
        imageUrl: "",
    });
    const [isMounted, setIsMounted] = useState(false);

    // Hydrate state from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const savedData = localStorage.getItem("3amscroll-workflow-data");
        const savedStage = localStorage.getItem("3amscroll-workflow-stage");

        if (savedData) {
            try {
                setWorkflowData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse saved workflow data");
            }
        }

        if (savedStage) {
            const parsedStage = parseInt(savedStage, 10);
            if (!isNaN(parsedStage) && parsedStage >= 1 && parsedStage <= 5) {
                setCurrentStage(parsedStage as Stage);
            }
        }
    }, []);

    // Persist state to localStorage whenever it changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("3amscroll-workflow-data", JSON.stringify(workflowData));
            localStorage.setItem("3amscroll-workflow-stage", currentStage.toString());
        }
    }, [workflowData, currentStage, isMounted]);

    const clearWorkflow = () => {
        if (window.confirm("Are you sure you want to clear your current progress and start over?")) {
            localStorage.removeItem("3amscroll-workflow-data");
            localStorage.removeItem("3amscroll-workflow-stage");
            setWorkflowData({
                topicIdea: "",
                workingTitle: "",
                seoKeyword: "",
                rawDraft: "",
                humanizedDraft: "",
                imageUrl: "",
            });
            setCurrentStage(1);
        }
    };

    const updateData = (updates: Partial<WorkflowData>) => {
        setWorkflowData(prev => ({ ...prev, ...updates }));
    };

    const nextStage = () => setCurrentStage(prev => Math.min(prev + 1, 5) as Stage);
    const prevStage = () => setCurrentStage(prev => Math.max(prev - 1, 1) as Stage);

    return (
        <div className="bg-white dark:bg-dark-surface/30 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-xl">
            {/* Header / Progress Bar */}
            <div className="border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 relative">

                {/* Prevent hydration mismatch by only rendering when mounted */}
                {!isMounted ? (
                    <div className="flex space-x-2 w-full animate-pulse">
                        {[1, 2, 3, 4, 5].map((stage) => (
                            <div key={stage} className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-white/10" />
                        ))}
                    </div>
                ) : (
                    <div className="flex space-x-2 w-full mr-4">
                        {[1, 2, 3, 4, 5].map((stage) => (
                            <div
                                key={stage}
                                className={`flex-1 h-2 rounded-full transition-colors ${currentStage >= stage ? 'bg-brand shadow-[0_0_10px_rgba(202,240,6,0.5)]' : 'bg-gray-200 dark:bg-white/10'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {isMounted && (
                    <button
                        onClick={clearWorkflow}
                        className="flex-shrink-0 flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Reset</span>
                    </button>
                )}
            </div>

            {/* Main Content Area */}
            <div className="p-6 sm:p-8">
                {currentStage === 1 && (
                    <Stage1TrendSpotter
                        data={workflowData}
                        updateData={updateData}
                        onNext={nextStage}
                    />
                )}
                {currentStage === 2 && (
                    <Stage2Writer
                        data={workflowData}
                        updateData={updateData}
                        onNext={nextStage}
                        onBack={prevStage}
                    />
                )}
                {currentStage === 3 && (
                    <Stage3Humanizer
                        data={workflowData}
                        updateData={updateData}
                        onNext={nextStage}
                        onBack={prevStage}
                    />
                )}
                {currentStage === 4 && (
                    <Stage4ImageGen
                        data={workflowData}
                        updateData={updateData}
                        onNext={nextStage}
                        onBack={prevStage}
                    />
                )}
                {currentStage === 5 && isMounted && (
                    <Stage5Publisher
                        data={workflowData}
                        updateData={updateData}
                        onBack={prevStage}
                    />
                )}
            </div>
        </div >
    );
}

"use client";

import { useState } from "react";
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

    const updateData = (updates: Partial<WorkflowData>) => {
        setWorkflowData(prev => ({ ...prev, ...updates }));
    };

    const nextStage = () => setCurrentStage(prev => Math.min(prev + 1, 5) as Stage);
    const prevStage = () => setCurrentStage(prev => Math.max(prev - 1, 1) as Stage);

    return (
        <div className="bg-white dark:bg-dark-surface/30 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-xl">
            {/* Header / Progress Bar */}
            <div className="border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4 sm:p-6 flex justify-between items-center">
                <div className="flex space-x-2 w-full">
                    {[1, 2, 3, 4, 5].map((stage) => (
                        <div
                            key={stage}
                            className={`flex-1 h-2 rounded-full transition-colors ${currentStage >= stage ? 'bg-brand' : 'bg-gray-200 dark:bg-white/10'
                                }`}
                        />
                    ))}
                </div>
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
                {currentStage === 5 && (
                    <Stage5Publisher
                        data={workflowData}
                        updateData={updateData}
                        onBack={prevStage}
                    />
                )}
            </div>
        </div>
    );
}

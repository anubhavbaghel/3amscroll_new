import { useState } from "react";
import { WorkflowData } from "./WorkflowDashboard";
import { Copy, CheckCircle2 } from "lucide-react";

interface Props {
    data: WorkflowData;
    updateData: (updates: Partial<WorkflowData>) => void;
    onNext: () => void;
}

export function Stage1TrendSpotter({ data, updateData, onNext }: Props) {
    const [topicInput, setTopicInput] = useState(data.topicIdea || "");
    const [copied, setCopied] = useState(false);

    // The highly engineered Prompt 1
    const generatePrompt = (topic: string) => `Act as an elite Gen-Z culture journalist and SEO expert for '3AM SCROLL', a digital media platform for the chronically online generation.

I need you to act as my "Trend Spotter". Use your live web search capabilities to deep-dive into the following broad topic: "${topic}".

Scan TikTok trends, Twitter discourses, Reddit theories, and Google Search volume related to this topic from the LAST 48 HOURS. 

Output exactly ONE highly specific, resilient article brief. I do NOT want generic listicles. I want a sharp, opinionated, or deeply relatable angle that Gen-Z actually cares about right now.

Respond ONLY in the following format:
**Title:** [A click-worthy, conversational, highly aesthetic 3AM SCROLL style title]
**SEO Keyword:** [The high-volume search term this targets]
**Angle:** [1-2 sentences explaining the unique "brainrot" or intellectual hook for this article]`;

    const handleCopy = () => {
        if (!topicInput) return;
        navigator.clipboard.writeText(generatePrompt(topicInput));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isReadyForNext = data.workingTitle.length > 5 && data.seoKeyword.length > 2;

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light mb-2">Stage 1: The Trend Spotter</h2>
                <p className="text-gray-400">Instruct your AI to scour the live internet for a high-converting Gen-Z angle.</p>
            </div>

            {/* Step 1: Input */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">1. What broad topic do you want to write about today?</label>
                <div className="relative">
                    <input
                        type="text"
                        value={topicInput}
                        onChange={(e) => {
                            setTopicInput(e.target.value);
                            updateData({ topicIdea: e.target.value });
                        }}
                        placeholder="e.g. Creator Economy, Dating Apps, Loneliness, Tech Layoffs"
                        className="w-full bg-dark-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                </div>

                {/* Quick Select Trendy Topics */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {[
                        "Creator Economy", "Dating Apps", "Mental Health",
                        "AI & Brainrot", "Tech Layoffs", "Hustle Culture",
                        "Social Media", "Remote Work", "Gen-Z Finance"
                    ].map((topic) => (
                        <button
                            key={topic}
                            onClick={() => {
                                setTopicInput(topic);
                                updateData({ topicIdea: topic });
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${topicInput === topic
                                    ? "bg-brand/20 border-brand text-brand-light"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 2: The Generated Prompt */}
            {topicInput && (
                <div className="space-y-3 animate-fade-in-up">
                    <div className="flex justify-between items-end">
                        <label className="block text-sm font-medium text-gray-300">2. Copy this Context Prompt into ChatGPT Plus or Claude 3.5 Sonnet:</label>
                        <button
                            onClick={handleCopy}
                            className="flex items-center space-x-2 text-sm text-brand hover:text-brand-light transition-colors px-3 py-1 rounded-full bg-brand/10"
                        >
                            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? "Copied!" : "Copy Prompt"}</span>
                        </button>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-purple-500/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <pre className="relative bg-black/80 border border-white/10 text-gray-300 p-6 rounded-xl overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed font-mono">
                            {generatePrompt(topicInput)}
                        </pre>
                    </div>
                </div>
            )}

            {/* Step 3: The Handoff */}
            <div className="space-y-4 pt-6 border-t border-white/5">
                <label className="block text-sm font-medium text-gray-300">3. Paste the AI's findings here:</label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Working Title</span>
                        <input
                            type="text"
                            value={data.workingTitle}
                            onChange={(e) => updateData({ workingTitle: e.target.value })}
                            placeholder="e.g. Why the 'Quiet Vacation' is Gen-Z's new flex"
                            className="w-full bg-dark-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">SEO Keyword</span>
                        <input
                            type="text"
                            value={data.seoKeyword}
                            onChange={(e) => updateData({ seoKeyword: e.target.value })}
                            placeholder="e.g. quiet vacationing trend"
                            className="w-full bg-dark-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={onNext}
                    disabled={!isReadyForNext}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${isReadyForNext
                        ? "bg-brand text-black hover:bg-brand-light shadow-[0_0_20px_rgba(202,240,6,0.3)]"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Proceed to Writer Stage
                </button>
            </div>
        </div>
    );
}

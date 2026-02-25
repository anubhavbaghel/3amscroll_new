import { useState } from "react";
import { WorkflowData } from "./WorkflowDashboard";
import { Copy, CheckCircle2 } from "lucide-react";

interface Props {
    data: WorkflowData;
    updateData: (updates: Partial<WorkflowData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function Stage2Writer({ data, updateData, onNext, onBack }: Props) {
    const [copied, setCopied] = useState(false);

    // The highly engineered Prompt 2: The Writer
    const generatePrompt = () => `Act as the lead Senior Writer for '3AM SCROLL', a digital publication aimed at the chronically online Gen-Z audience.

I need you to write a full-length, highly engaging article based on the following brief:
**Title:** ${data.workingTitle}
**Target SEO Keyword:** ${data.seoKeyword}

**THE BRAND VOICE & E-E-A-T (CRITICAL):**
- Conversational, sharp, slightly chaotic but deeply intellectual.
- Use current Gen-Z internet slang naturally (e.g., 'brainrot', 'chronically online', 'coded', 'era', 'canon'), but DO NOT overdo it to the point of cringe. Be authentic.
- Talk directly to the reader like you are in a FaceTime call at 3 AM.
- Absolutely NO robot-speak. No "In conclusion," "Furthermore," or "Delving into."
- **GOOGLE E-E-A-T COMPLIANCE:** You must write from a place of strong First-Hand Experience. Inject personal anecdotes or "we experienced this" framing to establish Expertise, Authoritativeness, and Trustworthiness. Do not sound like an AI summarizing a Wikipedia page; sound like an expert giving an insider take.

**FORMATTING RULES:**
- Write entirely in valid GitHub Flavored Markdown.
- Break up the text A LOT. Gen-Z doesn't read walls of text. Use short paragraphs (2-3 sentences max).
- Use lots of bullet points, bold text for emphasis, and sub-headers (##).
- Naturally integrate the SEO Keyword ("${data.seoKeyword}") exactly 3-4 times throughout the text.
- Do NOT output a title or a meta slug, just the body of the article starting from the hook.

Write the full 800-word article now:`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatePrompt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isReadyForNext = data.rawDraft.length > 50;

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light mb-2">Stage 2: The Writer</h2>
                <p className="text-gray-400">Locking in the 3AM SCROLL brand voice and generating the perfect article draft.</p>
            </div>

            {/* Step 1: The Generated Prompt */}
            <div className="space-y-3 animate-fade-in-up">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-300">1. Copy this Writer Prompt into your AI (Claude 3.5 Sonnet highly recommended):</label>
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
                        {generatePrompt()}
                    </pre>
                </div>
            </div>

            {/* Step 2: Handoff */}
            <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-300">2. Paste the raw Markdown article draft that the AI wrote:</label>
                    <span className="text-xs text-gray-500">{data.rawDraft.length} characters</span>
                </div>
                <textarea
                    value={data.rawDraft}
                    onChange={(e) => updateData({ rawDraft: e.target.value })}
                    placeholder="Paste the raw markdown text here..."
                    className="w-full h-64 bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand font-mono text-sm resize-y"
                />
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-full font-semibold text-gray-400 hover:text-white transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!isReadyForNext}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${isReadyForNext
                        ? "bg-brand text-black hover:bg-brand-light shadow-[0_0_20px_rgba(202,240,6,0.3)]"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Proceed to Anti-AI Engine
                </button>
            </div>
        </div>
    );
}

import { useState } from "react";
import { WorkflowData } from "./WorkflowDashboard";
import { Copy, CheckCircle2, Eye, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    data: WorkflowData;
    updateData: (updates: Partial<WorkflowData>) => void;
}

export function Stage3Humanizer({ data, updateData }: Props) {
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

    // The highly engineered Prompt 3: The Anti-AI Humanizer
    const generatePrompt = () => `I am running the text below through Google's Helpful Content Update AI Detectors. It is currently failing because it has high "burstiness" and low "perplexity" - the statistical markers of LLM generated text.

I need you to act as a linguistic "Scrambler" and REWRITE the entire text to pass as 100% human.

**CRITICAL INSTRUCTIONS FOR REWRITING:**
1. Drastically vary sentence length. Use 3-word fragments immediately followed by a meandering 20-word observation.
2. Break predictable syntax patterns. Never start three sentences in a row with the same structure (e.g. "The...", "This...", "It...").
3. Introduce minor colloquial imperfections. Use em-dashes (-), trailing thoughts (...), and conversational transitions.
4. Remove vocabulary that AI over-utilizes: "delve", "testament", "tapestry", "crucial", "landscape", "moreover".
5. Keep the formatting (headers, bolding, bullet points) EXACTLY the same. 
6. Keep the SEO Keyword ("${data.seoKeyword}") exactly where it is.

Output ONLY the rewritten, humanized Markdown text:

***

${data.rawDraft}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatePrompt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400 mb-2">Stage 3: Anti-AI Humanizer</h2>
                <p className="text-gray-400">Scramble the linguistic patterns to bypass Google's SEO penalties for AI text.</p>
            </div>

            {/* Step 1: The Generated Prompt */}
            <div className="space-y-3 animate-fade-in-up">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-300">1. Copy this Scrambler Prompt into your AI to humanize your draft:</label>
                    <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 text-sm text-red-500 hover:text-red-400 transition-colors px-3 py-1 rounded-full bg-red-500/10"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? "Copied!" : "Copy Scrambler"}</span>
                    </button>
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <pre className="relative bg-black/80 border border-white/10 text-gray-300 p-6 rounded-xl overflow-y-auto max-h-96 whitespace-pre-wrap text-sm leading-relaxed font-mono">
                        {generatePrompt()}
                    </pre>
                </div>
            </div>

            {/* Step 2: Handoff */}
            <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-300">2. Paste the final, humanized Markdown draft here:</label>
                    <div className="flex bg-white/5 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("edit")}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${viewMode === "edit" ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Raw Markdown</span>
                        </button>
                        <button
                            onClick={() => setViewMode("preview")}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${viewMode === "preview" ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                        </button>
                    </div>
                </div>

                {viewMode === "edit" ? (
                    <div className="relative">
                        <textarea
                            value={data.humanizedDraft}
                            onChange={(e) => updateData({ humanizedDraft: e.target.value })}
                            placeholder="Paste the mathematically scrambled, SEO-safe text here..."
                            className="w-full h-96 bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm resize-y"
                        />
                        <div className="absolute bottom-3 right-4 text-xs text-gray-500 bg-dark-background/80 px-2 py-1 rounded">
                            {data.humanizedDraft.length} characters
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-96 bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-6 py-6 text-gray-900 dark:text-gray-300 overflow-y-auto prose prose-invert prose-red max-w-none">
                        {data.humanizedDraft ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {data.humanizedDraft}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-gray-500 italic text-center mt-20">No content to preview yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

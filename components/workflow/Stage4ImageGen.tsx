import { useState } from "react";
import { WorkflowData } from "./WorkflowDashboard";
import { Copy, CheckCircle2 } from "lucide-react";

interface Props {
    data: WorkflowData;
    updateData: (updates: Partial<WorkflowData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function Stage4ImageGen({ data, updateData, onNext, onBack }: Props) {
    const [copied, setCopied] = useState(false);

    // The highly engineered Prompt 4: The Image Prompt
    const generatePrompt = () => `Generate a highly cinematic, ultra-aesthetic cover image for an article titled "${data.workingTitle}".

**STYLE GUIDE:**
- Visual Vibe: "3AM SCROLL"
- Lighting: Moody, glowing neon accents, high contrast, cinematic soft lighting.
- Palette: Deep blacks, rich grays, paired with electric lime green or cyber-purple accents.
- Composition: Editorial, minimalist, slightly glassmorphic. Must look incredibly premium, like a high-end tech/lifestyle magazine.
- Important: Absolutely NO text, NO words, and NO letters anywhere in the image.

**SUBJECT MATTER:**
Create an abstract but relatable visualization of: ${data.seoKeyword}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatePrompt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isReadyForNext = data.imageUrl.length > 5;

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-2">Stage 4: The Designer</h2>
                <p className="text-gray-400">Generate a stunning, cohesive cover image for your article.</p>
            </div>

            {/* Step 1: The Generated Prompt */}
            <div className="space-y-3 animate-fade-in-up">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-300">1. Copy this Designer Prompt into Midjourney, DALL-E 3, or Replicate:</label>
                    <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors px-3 py-1 rounded-full bg-purple-500/10"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? "Copied!" : "Copy Image Prompt"}</span>
                    </button>
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <pre className="relative bg-black/80 border border-white/10 text-gray-300 p-6 rounded-xl overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed font-mono">
                        {generatePrompt()}
                    </pre>
                </div>
            </div>

            {/* Step 2: Handoff / Uploader Mockup */}
            <div className="space-y-4 pt-6 border-t border-white/5">
                <label className="block text-sm font-medium text-gray-300">2. Paste the URL of your generated image (or upload to Supabase Storage):</label>

                <div className="space-y-2">
                    <input
                        type="url"
                        value={data.imageUrl}
                        onChange={(e) => updateData({ imageUrl: e.target.value })}
                        placeholder="https://... (URL to image)"
                        className="w-full bg-dark-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                    />
                </div>

                {data.imageUrl && (
                    <div className="mt-4 border border-white/10 rounded-xl overflow-hidden bg-black/50 aspect-video relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={data.imageUrl}
                            alt="Cover preview"
                            className="object-cover w-full h-full opacity-80"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
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
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                            : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Proceed to Publisher
                </button>
            </div>
        </div>
    );
}

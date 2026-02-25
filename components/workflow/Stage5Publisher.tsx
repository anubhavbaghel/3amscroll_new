import { useState } from "react";
import { WorkflowData } from "./WorkflowDashboard";
import { CheckCircle2, Rocket, Loader2 } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// We need to use the public key for client-side publishing in this internal tool
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface Props {
    data: WorkflowData;
    updateData: (updates: Partial<WorkflowData>) => void;
    onBack: () => void;
}

export function Stage5Publisher({ data, onBack }: Props) {
    const [isPublishing, setIsPublishing] = useState(false);
    const [published, setPublished] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Auto-generate a URL-friendly slug from the title
    const generatedSlug = data.workingTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    // Auto-generate a short excerpt from the first paragraph
    const generatedExcerpt = data.humanizedDraft
        .split('\n')
        .find(line => line.length > 20 && !line.startsWith('#'))
        ?.slice(0, 150) + "..." || "Read the full article...";

    const handlePublish = async () => {
        setIsPublishing(true);
        setError(null);

        try {
            // Validate environment
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                throw new Error("Supabase URL is missing from environment variables.");
            }

            // Calculate read time
            const wordCount = data.humanizedDraft.split(/\\s+/).filter(word => word.length > 0).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200));

            // Standardize the content insert matching the existing `articles` schema
            const { error: dbError } = await supabase
                .from('articles')
                .insert([
                    {
                        title: data.workingTitle,
                        slug: generatedSlug,
                        excerpt: generatedExcerpt,
                        content: data.humanizedDraft,
                        cover_image: data.imageUrl,
                        author_uuid: "00000000-0000-0000-0000-000000000000", // Default Admin Author ID
                        created_by: "00000000-0000-0000-0000-000000000000",
                        category: "tech",
                        status: "published",
                        read_time: readTime,
                        published_at: new Date().toISOString(),
                    }
                ]);

            if (dbError) throw dbError;

            setPublished(true);
        } catch (err: any) {
            console.error("Publishing error:", err);
            setError(err.message || "Failed to publish article.");
        } finally {
            setIsPublishing(false);
        }
    };

    if (published) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center space-y-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white">Article Published!</h2>
                <p className="text-gray-400 max-w-md">
                    Your Gen-Z optimized, SEO-friendly, mathematically scrambled article is now live on 3AM SCROLL.
                </p>
                <div className="pt-8">
                    <button
                        onClick={() => window.location.href = `/article/${generatedSlug}`}
                        className="px-8 py-3 rounded-full font-semibold border border-white/20 hover:bg-white hover:text-black transition-colors"
                    >
                        View Live Article
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="ml-4 px-8 py-3 rounded-full font-semibold bg-brand text-black hover:bg-brand-light transition-colors"
                    >
                        Start Next Article
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">Stage 5: The Publisher</h2>
                <p className="text-gray-400">Review the auto-generated metadata and push your article live to the world.</p>
            </div>

            {/* Step 1: Metadata Review */}
            <div className="space-y-6 animate-fade-in-up bg-black/40 border border-white/5 rounded-2xl p-6">

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Final Title</label>
                    <p className="text-xl font-bold text-white">{data.workingTitle}</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Generated URL Slug</label>
                    <p className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-md inline-block">
                        3amscroll.com/article/{generatedSlug}
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Generated Excerpt (For Homepage Cards)</label>
                    <p className="text-sm text-gray-300 italic border-l-2 border-brand pl-3">
                        {generatedExcerpt}
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Cover Image Link</label>
                    <p className="text-sm text-gray-400 truncate flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {data.imageUrl}
                    </p>
                </div>

            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-8 border-t border-white/5">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-full font-semibold text-gray-400 hover:text-white transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="flex items-center space-x-2 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90 shadow-[0_0_20px_rgba(56,189,248,0.3)] disabled:opacity-50 transition-all duration-300"
                >
                    {isPublishing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Publishing...</span>
                        </>
                    ) : (
                        <>
                            <Rocket className="w-5 h-5" />
                            <span>Publish Article</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

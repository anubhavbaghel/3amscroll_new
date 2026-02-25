import { useState, useEffect } from "react";
import { WorkflowData } from "./WorkflowDashboard";
import { CheckCircle2, Rocket, Loader2 } from "lucide-react";
import { createUserArticle } from "@/app/actions/user-article";

interface Props {
    data: WorkflowData;
    updateData: (updates: Partial<WorkflowData>) => void;
}

export function Stage5Publisher({ data, updateData }: Props) {
    const [isPublishing, setIsPublishing] = useState(false);
    const [published, setPublished] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Auto-generate fallbacks if fields are empty
    useEffect(() => {
        const generatedSlug = data.workingTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        const generatedExcerpt = data.humanizedDraft
            .split('\n')
            .find(line => line.length > 20 && !line.startsWith('#'))
            ?.slice(0, 150) + "..." || "Read the full article...";

        // Provide defaults if the user hasn't edited them yet
        if (!data.slug && data.workingTitle) updateData({ slug: generatedSlug });
        if (!data.excerpt && data.humanizedDraft) updateData({ excerpt: generatedExcerpt });
        if (!data.seoTitle && data.workingTitle) updateData({ seoTitle: data.workingTitle });
    }, [data.workingTitle, data.humanizedDraft, data.slug, data.excerpt, data.seoTitle, updateData]);

    const handlePublish = async () => {
        setIsPublishing(true);
        setError(null);

        try {
            const result = await createUserArticle({
                title: data.workingTitle,
                slug: data.slug || data.workingTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                excerpt: data.excerpt,
                content: data.humanizedDraft,
                coverImage: data.imageUrl,
                category: data.category || "tech",
                status: "published",
                seo_title: data.seoTitle,
                seo_description: data.seoDescription,
                focus_keyword: data.seoKeyword,
                cover_image_alt: data.coverImageAlt || data.seoKeyword
            });

            if (result.error) {
                throw new Error(result.error);
            }

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
                        onClick={() => window.location.href = `/article/${data.slug}`}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Final Title</label>
                        <input
                            type="text"
                            value={data.workingTitle}
                            onChange={(e) => updateData({ workingTitle: e.target.value })}
                            className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-semibold"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">URL Slug</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => updateData({ slug: e.target.value })}
                            className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-400 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Preview Excerpt</label>
                    <textarea
                        value={data.excerpt}
                        onChange={(e) => updateData({ excerpt: e.target.value })}
                        className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 italic"
                        rows={2}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                        <select
                            value={data.category}
                            onChange={(e) => updateData({ category: e.target.value })}
                            className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            <option value="tech">Tech & AI</option>
                            <option value="culture">Internet Culture</option>
                            <option value="lifestyle">Lifestyle & Work</option>
                            <option value="creative">Creatives & Arts</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Step 2: SEO Details */}
            <div className="space-y-6 animate-fade-in-up bg-black/40 border border-white/5 rounded-2xl p-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">SEO Optimization</h3>
                    <p className="text-sm text-gray-400">Ensure these are filled for proper indexing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Meta Title</label>
                        <input
                            type="text"
                            value={data.seoTitle}
                            onChange={(e) => updateData({ seoTitle: e.target.value })}
                            placeholder="Same as title or slightly shorter"
                            className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Focus Keyword</label>
                        <input
                            type="text"
                            value={data.seoKeyword}
                            onChange={(e) => updateData({ seoKeyword: e.target.value })}
                            className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Meta Description</label>
                    <textarea
                        value={data.seoDescription}
                        onChange={(e) => updateData({ seoDescription: e.target.value })}
                        placeholder="Write a compelling 160 character description..."
                        className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        rows={2}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Cover Image Alt Text</label>
                    <input
                        type="text"
                        value={data.coverImageAlt}
                        onChange={(e) => updateData({ coverImageAlt: e.target.value })}
                        placeholder="Describe the image perfectly..."
                        className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end pt-8 border-t border-white/5">
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

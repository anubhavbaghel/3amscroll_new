"use strict";
"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/admin/Editor").then(mod => mod.Editor), {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-gray-50 dark:bg-gray-800 rounded-lg w-full border border-gray-200 dark:border-gray-700" />,
});
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createArticle, updateArticle } from "@/app/admin/actions";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Target, CheckCircle2, AlertCircle, Eye, BarChart3, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/config/site";

interface ArticleData {
    id?: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    cover_image: string;
    status: string;
    seo_title?: string;
    seo_description?: string;
    focus_keyword?: string;
    cover_image_alt?: string;
}

interface ArticleFormProps {
    initialData?: ArticleData;
    mode: "create" | "edit";
}

export function ArticleForm({ initialData, mode }: ArticleFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");

    // Handle parsing the initial comma-separated category string into an array
    const initialCategories = initialData?.category
        ? initialData.category.split(',').map(c => c.trim()).filter(Boolean)
        : ["Tech & Future"]; // Default mapped to a real category
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);

    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
    const [status, setStatus] = useState(initialData?.status || "draft");
    const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "");
    const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || "");
    const [focusKeyword, setFocusKeyword] = useState(initialData?.focus_keyword || "");
    const [coverImageAlt, setCoverImageAlt] = useState(initialData?.cover_image_alt || "");
    const [isDirty, setIsDirty] = useState(false);
    const [isSeoSuggesting, setIsSeoSuggesting] = useState(false);
    const [lastContentWordCount, setLastContentWordCount] = useState(0);

    // Track word count
    useEffect(() => {
        const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
        setLastContentWordCount(words);
    }, [content]);

    // Track dirty state
    useEffect(() => {
        const isCurrentlyDirty =
            title !== (initialData?.title || "") ||
            slug !== (initialData?.slug || "") ||
            selectedCategories.join(', ') !== (initialData?.category || "Tech & Future") ||
            excerpt !== (initialData?.excerpt || "") ||
            content !== (initialData?.content || "") ||
            coverImage !== (initialData?.cover_image || "") ||
            status !== (initialData?.status || "draft") ||
            seoTitle !== (initialData?.seo_title || "") ||
            seoDescription !== (initialData?.seo_description || "") ||
            focusKeyword !== (initialData?.focus_keyword || "") ||
            coverImageAlt !== (initialData?.cover_image_alt || "");

        setIsDirty(isCurrentlyDirty);
    }, [title, slug, selectedCategories, excerpt, content, coverImage, status, seoTitle, seoDescription, focusKeyword, coverImageAlt, initialData]);

    // Prevent navigation if dirty
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    // AI Helper: Suggest SEO content via reliable server action
    const suggestSEO = async () => {
        if (!title && !content) {
            toast.error("Add a title or content first!");
            return;
        }

        setIsSeoSuggesting(true);
        try {
            const bodyText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
            const response = await fetch("/api/admin/magic-fill", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content: bodyText }),
            });

            if (!response.ok) throw new Error("API responded with an error");

            const data = await response.json();

            if (data.focus_keyword) setFocusKeyword(data.focus_keyword);

            if (data.seo_title) {
                // Ensure it doesn't exceed 60 chars including the brand
                const brand = " | 3AM SCROLL";
                const maxTitleLen = 60 - brand.length;
                let finalTitle = data.seo_title;
                if (finalTitle.length > maxTitleLen) {
                    finalTitle = finalTitle.substring(0, maxTitleLen - 3) + "...";
                }
                setSeoTitle(finalTitle + brand);
            }

            if (data.seo_description) setSeoDescription(data.seo_description);

            // Set excerpt to a safe length if it's currently empty
            if (!excerpt && data.seo_description) {
                setExcerpt(data.seo_description.substring(0, 155));
            } else if (!excerpt && bodyText) {
                const autoExcerpt = bodyText.substring(0, 155).trim();
                setExcerpt(autoExcerpt + (bodyText.length > 155 ? "..." : ""));
            }

            if (data.cover_image_alt && !coverImageAlt) {
                setCoverImageAlt(data.cover_image_alt);
            }

            toast.success("Magic Fill complete!");
        } catch (error) {
            console.error("SEO Suggestion Error:", error);
            toast.error("Failed to generate suggestions. Try again later.");
        } finally {
            setIsSeoSuggesting(false);
        }
    };

    // Auto-generate slug from title if in create mode and slug is empty
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (mode === "create" && !slug) {
            setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
        }
    };

    const handleSubmit = async (e: React.FormEvent, submitStatus?: string) => {
        if (e) e.preventDefault();

        const targetStatus = submitStatus || status;

        if (!title || !slug || !excerpt || !content || selectedCategories.length === 0) {
            toast.error("Please fill in all required fields (Title, Content, Excerpt) and pick at least one Category.");
            return;
        }

        const formattedCategories = selectedCategories.join(', ');

        const formData = new FormData();
        if (mode === "edit" && initialData?.id) {
            formData.append("id", initialData.id);
        }
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("category", formattedCategories);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        formData.append("cover_image", coverImage || "");
        formData.append("status", targetStatus);
        formData.append("seo_title", seoTitle);
        formData.append("seo_description", seoDescription);
        formData.append("focus_keyword", focusKeyword);
        formData.append("cover_image_alt", coverImageAlt);

        startTransition(async () => {
            try {
                if (mode === "create") {
                    await createArticle(formData);
                    toast.success("Article created successfully!");
                } else {
                    await updateArticle(formData);
                    toast.success("Article updated successfully!");
                }
                setIsDirty(false); // Reset dirty state on successful save
                router.push("/admin");
                router.refresh();
            } catch (error: any) {
                toast.error(error.message || "Something went wrong.");
            }
        });
    };

    const seoChecklist = [
        {
            id: 'keyword-title',
            label: "Focus keyword in SEO title",
            passed: focusKeyword && seoTitle.toLowerCase().includes(focusKeyword.toLowerCase()),
        },
        {
            id: 'keyword-slug',
            label: "Focus keyword in Slug",
            passed: focusKeyword && slug.toLowerCase().includes(focusKeyword.toLowerCase()),
        },
        {
            id: 'keyword-desc',
            label: "Focus keyword in Meta Description",
            passed: focusKeyword && seoDescription.toLowerCase().includes(focusKeyword.toLowerCase()),
        },
        {
            id: 'desc-length',
            label: "Meta Description length (120-160)",
            passed: seoDescription.length >= 120 && seoDescription.length <= 160,
        },
        {
            id: 'title-length',
            label: "SEO Title length (max 60)",
            passed: seoTitle.length > 0 && seoTitle.length <= 60,
        },
        {
            id: 'word-count',
            label: "Content length (min 300 words)",
            passed: lastContentWordCount >= 300,
        }
    ];

    const passedCount = seoChecklist.filter(c => c.passed).length;
    const seoScore = Math.round((passedCount / seoChecklist.length) * 100);

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500 border-green-500/20 bg-green-500/5";
        if (score >= 50) return "text-amber-500 border-amber-500/20 bg-amber-500/5";
        return "text-red-500 border-red-500/20 bg-red-500/5";
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-lg px-4 py-2"
                                placeholder="Enter article title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Content
                            </label>
                            <Editor value={content} onChange={setContent} />
                        </div>

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Excerpt
                            </label>
                            <textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                                placeholder="Short description for cards and SEO"
                            />
                        </div>
                    </div>

                    {/* SEO Section */}
                    <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 space-y-8">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                            <div className="flex items-center gap-2">
                                <Search className="w-5 h-5 text-indigo-500" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Search Engine Optimization</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={suggestSEO}
                                    disabled={isSeoSuggesting}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all disabled:opacity-50 mr-2"
                                >
                                    <Sparkles className={`w-3.5 h-3.5 ${isSeoSuggesting ? "animate-spin" : ""}`} />
                                    {isSeoSuggesting ? "Analyzing..." : "Magic Suggest"}
                                </button>
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-full">
                                    <BarChart3 className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">SEO Score: {seoScore}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="focusKeyword" className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <Target className="w-4 h-4 text-indigo-500" />
                                        Focus Keyword
                                    </label>
                                    <input
                                        type="text"
                                        id="focusKeyword"
                                        value={focusKeyword}
                                        onChange={(e) => setFocusKeyword(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                                        placeholder="e.g., sustainable living"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="seoTitle" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        SEO Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        id="seoTitle"
                                        value={seoTitle}
                                        onChange={(e) => setSeoTitle(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                                        placeholder="Target title for Google"
                                    />
                                    <div className="mt-1 flex justify-between text-[10px] font-medium">
                                        <span className={seoTitle.length > 60 ? "text-red-500" : "text-gray-400"}>
                                            {seoTitle.length} / 60 characters
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="seoDescription" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        SEO Meta Description
                                    </label>
                                    <textarea
                                        id="seoDescription"
                                        value={seoDescription}
                                        onChange={(e) => setSeoDescription(e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                                        placeholder="This description will appear in search results..."
                                    />
                                    <div className="mt-1 flex justify-between text-[10px] font-medium">
                                        <span className={(seoDescription.length < 120 || seoDescription.length > 160) ? "text-amber-500" : "text-green-500"}>
                                            {seoDescription.length} characters (Recommended: 120-160)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* SERP PREVIEW */}
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Eye className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search Preview</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[14px] text-gray-400 truncate">
                                            3amscroll.com › article › {slug || 'your-slug'}
                                        </div>
                                        <div className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-tight line-clamp-1">
                                            {seoTitle || title || 'Article Title'}
                                        </div>
                                        <div className="text-[14px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                            {seoDescription || excerpt || 'Enter a meta description to see a preview of how your article might appear in search engine results.'}
                                        </div>
                                    </div>
                                </div>

                                {/* Checklist */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">SEO Checklist</h4>
                                    <div className="space-y-2">
                                        {seoChecklist.map((check) => (
                                            <div key={check.id} className="flex items-start gap-2">
                                                {check.passed ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                ) : (
                                                    <AlertCircle className="w-4 h-4 text-gray-300 dark:text-gray-700 mt-0.5 shrink-0" />
                                                )}
                                                <span className={`text-xs ${check.passed ? "text-gray-700 dark:text-gray-300" : "text-gray-500"}`}>
                                                    {check.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cover Image
                            </label>
                            <ImageUpload
                                value={coverImage}
                                onChange={setCoverImage}
                                disabled={isPending}
                            />
                            <div className="mt-4">
                                <label htmlFor="cover_image_alt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Alt Text (SEO & Accessibility)
                                </label>
                                <input
                                    type="text"
                                    id="cover_image_alt"
                                    value={coverImageAlt}
                                    onChange={(e) => setCoverImageAlt(e.target.value)}
                                    placeholder="Describe the image content"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Slug
                            </label>
                            <input
                                type="text"
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Categories
                            </label>

                            <div className="flex flex-wrap gap-2 mb-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[50px] items-center">
                                {selectedCategories.length === 0 ? (
                                    <span className="text-gray-400 text-sm">Select categories from below...</span>
                                ) : (
                                    selectedCategories.map((cat, index) => (
                                        <div key={index} className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium border border-indigo-100 dark:border-indigo-500/20">
                                            {cat}
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))}
                                                className="hover:bg-indigo-200 dark:hover:bg-indigo-500/30 p-0.5 rounded-full transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 pb-2">
                                {siteConfig.categories.map((c) => {
                                    const isSelected = selectedCategories.includes(c.name);
                                    if (isSelected) return null;
                                    return (
                                        <button
                                            type="button"
                                            key={c.id}
                                            onClick={() => setSelectedCategories(prev => [...prev, c.name])}
                                            className="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            + {c.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e as any, "draft")}
                                disabled={isPending}
                                className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? "Saving..." : "Save as Draft"}
                            </button>
                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e as any, "published")}
                                disabled={isPending}
                                className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (mode === "create" ? "Publishing..." : "Publish Changes") : (mode === "create" ? "Publish Article" : "Publish Changes")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

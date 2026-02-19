"use strict";
"use client";

import { Editor } from "@/components/admin/Editor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createArticle, updateArticle } from "@/app/admin/actions";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Target, CheckCircle2, AlertCircle, Eye, BarChart3 } from "lucide-react";
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
    const [category, setCategory] = useState(initialData?.category || "Tech");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
    const [status, setStatus] = useState(initialData?.status || "draft");
    const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "");
    const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || "");
    const [focusKeyword, setFocusKeyword] = useState(initialData?.focus_keyword || "");
    const [coverImageAlt, setCoverImageAlt] = useState(initialData?.cover_image_alt || "");
    const [isDirty, setIsDirty] = useState(false);

    // Track dirty state
    useEffect(() => {
        const isCurrentlyDirty =
            title !== (initialData?.title || "") ||
            slug !== (initialData?.slug || "") ||
            category !== (initialData?.category || "Tech") ||
            excerpt !== (initialData?.excerpt || "") ||
            content !== (initialData?.content || "") ||
            coverImage !== (initialData?.cover_image || "") ||
            status !== (initialData?.status || "draft") ||
            seoTitle !== (initialData?.seo_title || "") ||
            seoDescription !== (initialData?.seo_description || "") ||
            focusKeyword !== (initialData?.focus_keyword || "") ||
            coverImageAlt !== (initialData?.cover_image_alt || "");

        setIsDirty(isCurrentlyDirty);
    }, [title, slug, category, excerpt, content, coverImage, status, seoTitle, seoDescription, focusKeyword, coverImageAlt, initialData]);

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

    // Auto-generate slug from title if in create mode and slug is empty
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (mode === "create" && !slug) {
            setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !slug || !excerpt || !content || !coverImage) {
            toast.error("Please fill in all required fields");
            return;
        }

        const formData = new FormData();
        if (mode === "edit" && initialData?.id) {
            formData.append("id", initialData.id);
        }
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("category", category);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        formData.append("cover_image", coverImage);
        formData.append("status", status);
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
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
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
            passed: content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length >= 300,
        }
    ];

    const passedCount = seoChecklist.filter(c => c.passed).length;
    const seoScore = Math.round((passedCount / seoChecklist.length) * 100);

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
                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-full">
                                <BarChart3 className="w-4 h-4 text-gray-500" />
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">SEO Score: {seoScore}%</span>
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
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            >
                                <option value="Tech">Tech</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Finance">Finance</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (mode === "create" ? "Creating..." : "Saving...") : (mode === "create" ? "Create Article" : "Save Changes")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

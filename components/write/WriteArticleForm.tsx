"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createUserArticle, updateUserArticle } from "@/app/actions/user-article";
import { toast } from "sonner";
import { Search, Target, CheckCircle2, AlertCircle, Eye, BarChart3 } from "lucide-react";

const Editor = dynamic(() => import("@/components/admin/Editor").then(mod => mod.Editor), {
    ssr: false,
    loading: () => <div className="h-[300px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
});

const CATEGORIES = [
    "Technology",
    "Culture",
    "Politics",
    "Entertainment",
    "Sports",
    "Science",
    "Business",
    "Lifestyle",
];

interface WriteArticleFormProps {
    initialData?: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string;
        category: string;
        status: string;
        seo_title?: string;
        seo_description?: string;
        focus_keyword?: string;
        cover_image_alt?: string;
    };
}

export function WriteArticleForm({ initialData }: WriteArticleFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        coverImage: initialData?.coverImage || "",
        category: initialData?.category || "",
        seo_title: initialData?.seo_title || "",
        seo_description: initialData?.seo_description || "",
        focus_keyword: initialData?.focus_keyword || "",
        cover_image_alt: initialData?.cover_image_alt || "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Auto-generate slug from title (only for new articles)
    const handleTitleChange = (title: string) => {
        setFormData(prev => {
            const updates: any = { title };
            if (!initialData) {
                updates.slug = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
            }
            return { ...prev, ...updates };
        });
        setErrors(prev => ({ ...prev, title: '' }));
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        setErrors({});

        startTransition(async () => {
            let result;

            if (initialData) {
                result = await updateUserArticle(initialData.id, {
                    ...formData,
                    status,
                });
            } else {
                result = await createUserArticle({
                    ...formData,
                    status,
                });
            }

            if (result.error) {
                toast.error(result.error);

                // Handle validation errors
                if (result.validationErrors) {
                    const errorMap: Record<string, string> = {};
                    result.validationErrors.forEach((err) => {
                        errorMap[err.field] = err.message;
                    });
                    setErrors(errorMap);
                }
                return;
            }

            toast.success(
                status === 'published'
                    ? "Article published successfully!"
                    : "Draft saved successfully!"
            );

            if (status === 'published') {
                router.push(`/article/${formData.slug}`);
            } else {
                router.push('/my-articles');
            }
        });
    };

    const seoChecklist = [
        {
            id: 'keyword-title',
            label: "Focus keyword in SEO title",
            passed: formData.focus_keyword && formData.seo_title.toLowerCase().includes(formData.focus_keyword.toLowerCase()),
        },
        {
            id: 'keyword-slug',
            label: "Focus keyword in Slug",
            passed: formData.focus_keyword && formData.slug.toLowerCase().includes(formData.focus_keyword.toLowerCase()),
        },
        {
            id: 'keyword-desc',
            label: "Focus keyword in Meta Description",
            passed: formData.focus_keyword && formData.seo_description.toLowerCase().includes(formData.focus_keyword.toLowerCase()),
        },
        {
            id: 'desc-length',
            label: "Meta Description length (120-160)",
            passed: formData.seo_description.length >= 120 && formData.seo_description.length <= 160,
        },
        {
            id: 'title-length',
            label: "SEO Title length (max 60)",
            passed: formData.seo_title.length > 0 && formData.seo_title.length <= 60,
        },
        {
            id: 'word-count',
            label: "Content length (min 100 words)",
            passed: formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length >= 100,
        }
    ];

    const passedCount = seoChecklist.filter(c => c.passed).length;
    const seoScore = Math.round((passedCount / seoChecklist.length) * 100);

    return (
        <div className="space-y-6">
            {/* Cover Image */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Cover Image <span className="text-red-500">*</span>
                </label>
                <ImageUpload
                    value={formData.coverImage}
                    onChange={(url) => {
                        setFormData(prev => ({ ...prev, coverImage: url }));
                    }}
                />
                <div className="mt-4">
                    <label htmlFor="cover_image_alt" className="block text-sm font-medium mb-1">
                        Image Alt Text (SEO & Accessibility)
                    </label>
                    <input
                        id="cover_image_alt"
                        type="text"
                        value={formData.cover_image_alt}
                        onChange={(e) => setFormData(prev => ({ ...prev, cover_image_alt: e.target.value }))}
                        placeholder="Describe what's in the image..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                </div>
                {errors.coverImage && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
                )}
            </div>

            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter article title..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand text-lg font-semibold"
                    maxLength={200}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                    {formData.title.length}/200 characters
                </p>
            </div>

            {/* Slug */}
            <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-2">
                    URL Slug
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">3amscroll.com/article/</span>
                    <input
                        id="slug"
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                </label>
                <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => {
                        setFormData(prev => ({ ...prev, category: e.target.value }));
                        setErrors(prev => ({ ...prev, category: '' }));
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand"
                >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
            </div>

            {/* Excerpt */}
            <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                    Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => {
                        setFormData(prev => ({ ...prev, excerpt: e.target.value }));
                        setErrors(prev => ({ ...prev, excerpt: '' }));
                    }}
                    placeholder="Brief summary of your article..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                    maxLength={300}
                />
                {errors.excerpt && (
                    <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                    {formData.excerpt.length}/300 characters
                </p>
            </div>

            {/* Content Editor */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Content <span className="text-red-500">*</span>
                </label>
                <Editor
                    value={formData.content}
                    onChange={(content) => {
                        setFormData(prev => ({ ...prev, content }));
                        setErrors(prev => ({ ...prev, content: '' }));
                    }}
                />
                {errors.content && (
                    <p className="text-red-500 text-sm mt-2">{errors.content}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                    Minimum 100 words required for publishing
                </p>
            </div>

            {/* SEO Section */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border p-6 space-y-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
                    <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-brand" />
                        <h3 className="text-lg font-bold">Search Engine Optimization</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-dark-bg/50 rounded-full border border-gray-100 dark:border-dark-border">
                        <BarChart3 className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-bold">SEO Score: {seoScore}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="focus_keyword" className="flex items-center gap-1.5 text-sm font-semibold mb-1">
                                <Target className="w-4 h-4 text-brand" />
                                Focus Keyword
                            </label>
                            <input
                                type="text"
                                id="focus_keyword"
                                value={formData.focus_keyword}
                                onChange={(e) => setFormData(prev => ({ ...prev, focus_keyword: e.target.value }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                                placeholder="e.g., tech trends 2025"
                            />
                        </div>

                        <div>
                            <label htmlFor="seo_title" className="block text-sm font-semibold mb-1">
                                SEO Meta Title
                            </label>
                            <input
                                type="text"
                                id="seo_title"
                                value={formData.seo_title}
                                onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                                placeholder="Target title for search results"
                            />
                            <div className="mt-1 flex justify-between text-[10px] font-medium">
                                <span className={formData.seo_title.length > 60 ? "text-red-500" : "text-gray-400"}>
                                    {formData.seo_title.length} / 60 characters
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="seo_description" className="block text-sm font-semibold mb-1">
                                SEO Meta Description
                            </label>
                            <textarea
                                id="seo_description"
                                value={formData.seo_description}
                                onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand text-sm resize-none"
                                placeholder="This snippet will appear in search results..."
                            />
                            <div className="mt-1 flex justify-between text-[10px] font-medium">
                                <span className={(formData.seo_description.length < 120 || formData.seo_description.length > 160) ? "text-amber-500" : "text-green-500"}>
                                    {formData.seo_description.length} characters (Recommended: 120-160)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* SERP PREVIEW */}
                        <div className="p-4 bg-gray-50 dark:bg-dark-bg/50 rounded-xl border border-gray-100 dark:border-dark-border">
                            <div className="flex items-center gap-2 mb-3">
                                <Eye className="w-4 h-4 text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Preview</span>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[12px] text-gray-400 truncate">
                                    3amscroll.com › article › {formData.slug || 'your-slug'}
                                </div>
                                <div className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-tight line-clamp-1">
                                    {formData.seo_title || formData.title || 'Article Title'}
                                </div>
                                <div className="text-[13px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {formData.seo_description || formData.excerpt || 'Enter a meta description to see how your article might appear in Google...'}
                                </div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SEO Checklist</h4>
                            <div className="space-y-2">
                                {seoChecklist.map((check) => (
                                    <div key={check.id} className="flex items-start gap-2">
                                        {check.passed ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        ) : (
                                            <AlertCircle className="w-4 h-4 text-gray-300 dark:text-gray-700 mt-0.5 shrink-0" />
                                        )}
                                        <span className={`text-[11px] ${check.passed ? "text-gray-700 dark:text-gray-300" : "text-gray-500"}`}>
                                            {check.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-dark-border">
                <button
                    type="button"
                    onClick={() => handleSubmit('draft')}
                    disabled={isPending}
                    className="px-6 py-3 rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                    type="button"
                    onClick={() => handleSubmit('published')}
                    disabled={isPending}
                    className="flex-1 px-6 py-3 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Publishing...' : 'Publish Article'}
                </button>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Publishing Guidelines
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Articles must be at least 100 words</li>
                    <li>• Title should be descriptive (5-200 characters)</li>
                    <li>• Cover image is required</li>
                    <li>• Content must be original and appropriate</li>
                    <li>• Maximum 5 articles per day</li>
                </ul>
            </div>
        </div>
    );
}

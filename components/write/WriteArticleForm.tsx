"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createUserArticle } from "@/app/actions/user-article";
import { toast } from "sonner";

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

export function WriteArticleForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Auto-generate slug from title
    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
        }));
        setErrors(prev => ({ ...prev, title: '' }));
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        setErrors({});

        startTransition(async () => {
            const result = await createUserArticle({
                ...formData,
                status,
            });

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
                        setErrors(prev => ({ ...prev, coverImage: '' }));
                    }}
                />
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

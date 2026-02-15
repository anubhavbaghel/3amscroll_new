"use strict";
"use client";

import { Editor } from "@/components/admin/Editor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createArticle, updateArticle } from "@/app/admin/actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";
interface ArticleData {
    id?: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    cover_image: string;
    status: string;
}

interface ArticleFormProps {
    initialData?: ArticleData;
    mode: "create" | "edit";
}

export function ArticleForm({ initialData, mode }: ArticleFormProps) {
    // const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [category, setCategory] = useState(initialData?.category || "Tech");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
    const [status, setStatus] = useState(initialData?.status || "draft");

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

        startTransition(async () => {
            try {
                if (mode === "create") {
                    await createArticle(formData);
                    toast.success("Article created successfully!");
                } else {
                    await updateArticle(formData);
                    toast.success("Article updated successfully!");
                }
                // Redirect is handled by server action, but we can do it here too if needed
                // router.push("/admin"); 
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
            }
        });
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

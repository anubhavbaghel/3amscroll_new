import { createArticle } from "../../actions";

export default function NewArticlePage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
    // Await searchParams correctly for Next.js 15
    // Note: Since this is a server component, we need to handle the promise if accessed directly
    // However, for initial render or simple usage, let's just use it safely if passed.
    // Ideally we verify if we need to await it. Based on recent fixes, yes.

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="max-w-3xl mx-auto px-4 lg:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Article</h1>
                    <a href="/admin" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        &larr; Back to Dashboard
                    </a>
                </div>

                <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                    <ErrorMessageWrapper searchParams={searchParams} />

                    <form action={createArticle} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Slug (URL friendly ID)
                            </label>
                            <input
                                type="text"
                                name="slug"
                                id="slug"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                required
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
                            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Summary (Short description)
                            </label>
                            <textarea
                                name="summary"
                                id="summary"
                                rows={3}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Cover Image URL
                            </label>
                            <input
                                type="url"
                                name="cover_image"
                                id="cover_image"
                                required
                                placeholder="https://images.unsplash.com/..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Content (HTML supported)
                            </label>
                            <textarea
                                name="content"
                                id="content"
                                rows={10}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2 font-mono"
                            />
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 sm:text-sm px-3 py-2"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Create Article
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

async function ErrorMessageWrapper({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
    if (!searchParams) return null;
    const { error } = await searchParams;

    if (!error) return null;

    return (
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
            {error}
        </div>
    );
}

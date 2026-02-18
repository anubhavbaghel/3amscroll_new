export default function ArticleLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero-like area */}
            <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-12">
                <div className="space-y-6">
                    {/* Category badge */}
                    <div className="h-6 w-20 rounded-full bg-gray-100 dark:bg-gray-900 animate-pulse" />
                    {/* Title */}
                    <div className="h-12 w-full rounded-lg bg-gray-100 dark:bg-gray-900 animate-pulse" />
                    <div className="h-12 w-2/3 rounded-lg bg-gray-100 dark:bg-gray-900 animate-pulse" />
                    {/* Author/Date */}
                    <div className="flex items-center gap-4 py-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-900 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-4 w-32 rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                            <div className="h-3 w-24 rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Cover Image Placeholder */}
                <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse mt-8 mb-10" />

                {/* Content paragraphs */}
                <div className="max-w-[680px] mx-auto space-y-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-4 w-full rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                    ))}
                    <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

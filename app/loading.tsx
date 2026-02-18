export default function RootLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Skeleton for Header area if not already handled by layout */}
            <div className="h-16 border-b border-gray-100 dark:border-gray-800 animate-pulse bg-white dark:bg-black" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Skeleton */}
                <div className="aspect-[21/9] w-full rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse mb-12" />

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <div className="aspect-[16/10] w-full rounded-xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
                            <div className="h-6 w-3/4 rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                            <div className="h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

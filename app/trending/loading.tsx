export default function TrendingLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Ticker placeholder */}
            <div className="h-12 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 animate-pulse" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Grid for Trending */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="aspect-video lg:aspect-square rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
                    <div className="grid grid-rows-2 gap-6">
                        <div className="rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
                        <div className="rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
                    </div>
                </div>

                {/* Grid placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-5 w-full rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                                <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-gray-900 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

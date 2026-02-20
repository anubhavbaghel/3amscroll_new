export default function SearchLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="w-64 h-8 bg-gray-200 dark:bg-dark-surface rounded-lg animate-pulse mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4">
                        <div className="aspect-video w-full bg-gray-200 dark:bg-dark-surface rounded-2xl animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-6 w-3/4 bg-gray-200 dark:bg-dark-surface rounded animate-pulse" />
                            <div className="h-4 w-1/2 bg-gray-100 dark:bg-dark-surface/50 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

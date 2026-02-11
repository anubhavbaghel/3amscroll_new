import { Article } from "@/types";
import { ArticleCardDesktop } from "@/components/article/ArticleCardDesktop";

interface TrendingListProps {
    articles: Article[];
}

export function TrendingList({ articles }: TrendingListProps) {
    if (articles.length === 0) return null;

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Trending Stories</h2>
                {/* Time Filter can be added here */}
            </div>

            <div className="space-y-6">
                {articles.map((article, index) => (
                    <div key={article.id} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 pt-2 text-center font-bold text-lg text-gray-400 dark:text-gray-600">
                            #{index + 4}
                        </div>
                        <div className="flex-1">
                            <ArticleCardDesktop article={article} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

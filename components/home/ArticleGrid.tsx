import { Article } from "@/types";
import { ArticleCard } from "@/components/article/ArticleCard";

interface ArticleGridProps {
    articles: Article[];
    savedArticleIds: Set<string>;
    likedArticleIds: Set<string>;
}

export function ArticleGrid({ articles, savedArticleIds, likedArticleIds }: ArticleGridProps) {
    return (
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {articles.map((article, index) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    priority={index < 6}
                    isSaved={savedArticleIds.has(article.id)}
                    isLiked={likedArticleIds.has(article.id)}
                />
            ))}
        </div>
    );
}

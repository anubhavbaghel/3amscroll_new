import { Article } from "@/types";
import { ArticleCard } from "@/components/article/ArticleCard";

interface ArticleGridProps {
    articles: Article[];
    savedArticleIds?: Set<string>;
    likedArticleIds?: Set<string>;
    mobileHeroArticle?: Article;
}

export function ArticleGrid({ articles, savedArticleIds = new Set(), likedArticleIds = new Set(), mobileHeroArticle }: ArticleGridProps) {
    return (
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Mobile Hero Article (Only visible on mobile) */}
            {mobileHeroArticle && (
                <div className="lg:hidden">
                    <ArticleCard
                        article={mobileHeroArticle}
                        priority={true}
                        isSaved={savedArticleIds.has(mobileHeroArticle.id)}
                        isLiked={likedArticleIds.has(mobileHeroArticle.id)}
                    />
                </div>
            )}

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

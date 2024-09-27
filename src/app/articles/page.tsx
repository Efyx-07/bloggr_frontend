'use client';

import '../../styles/page.scss';
import './ArticlePage.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import HeadTitle from '@/components/Sharables/Others/HeadTitle';
import ArticleCard from '@/components/ArticleCard';
import LoadingPage from '@/components/LoadingPage';
import NoArticle from '@/components/NoArticle';

export default function ArticlesPage() {
  const {
    data: articles,
    error,
    isLoading,
  } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="page">
      <div
        className={`${articles && articles.length > 0 ? 'articles-page-content' : 'content'}`}
      >
        {articles && articles.length > 0 ? (
          <>
            <HeadTitle title="Mes articles" />
            <div className="article-cards-container">
              {articles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <NoArticle />
        )}
      </div>
    </div>
  );
}

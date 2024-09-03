'use client';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../_layouts/MainLayout';
import fetchArticles from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import ArticleCard from '@/components/ArticleCard';

export default function ArticlesPage() {
  const {
    data: articles,
    error,
    isLoading,
  } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <MainLayout>
      <div className="page">
        <div className="content">
          <h1>Article</h1>
          <div className="article-cards-container">
            {articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

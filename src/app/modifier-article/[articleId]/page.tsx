'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticles } from '@/services/articles.service';

export default function UpdateArticlePage() {
  const { articleId } = useParams();

  const {
    data: articles,
    error,
    isLoading,
  } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  const selectedArticle: Article | undefined = articles?.find(
    (article) => article.id === Number(articleId),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="page">
      <div className="content">
        <h1>Modifier article {selectedArticle?.title}</h1>
      </div>
    </div>
  );
}

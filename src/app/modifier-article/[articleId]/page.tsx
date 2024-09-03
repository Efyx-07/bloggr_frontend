'use client';

import MainLayout from '@/app/_layouts/MainLayout';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticles } from '@/services/articles.service';
import UpdateArticleForm from '@/components/Articles-forms/UpdateArticleForm';

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
    <>
      <MainLayout>
        <div className="page">
          <div className="content">
            {selectedArticle ? (
              <>
                <h1>Modifier article {selectedArticle?.title}</h1>
                <UpdateArticleForm selectedArticle={selectedArticle} />
              </>
            ) : (
              <p>No article found</p>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
}

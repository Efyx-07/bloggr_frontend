'use client';

import MainLayout from '@/app/_layouts/MainLayout';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import UpdateArticleForm from '@/components/Articles-forms/UpdateArticleForm';

export default function UpdateArticlePage() {
  const { articleId } = useParams();

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article>({
    queryKey: ['article', articleId],
    queryFn: () => fetchArticleById(Number(articleId)),
  });

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
            {article ? (
              <>
                <h1>Modifier article {article?.title}</h1>
                <UpdateArticleForm selectedArticle={article} />
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

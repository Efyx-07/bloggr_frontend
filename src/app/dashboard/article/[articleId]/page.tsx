'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';
import ArticlePageHead from '@/components/PageHeads/ArticlePageHead';
import ArticleFull from '@/components/ArticleFull';

export default function ArticlePage() {
  const { articleId } = useParams();
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article>({
    queryKey: ['article', articleId],
    queryFn: () => fetchArticleById(Number(articleId)),
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <p>An error occurred: {error.message}</p>;

  setTimeout(() => {
    setIsContentVisible(true);
  }, loadingPageDelay);

  return (
    <>
      {isContentVisible ? (
        <div className="page">
          <div className="content">
            {article ? (
              <>
                <ArticlePageHead article={article} />
                <ArticleFull article={article} />
              </>
            ) : (
              <p>No article found</p>
            )}
          </div>
        </div>
      ) : (
        <LoadingPage mention={`Accès à l'article: ${article?.title}...`} />
      )}
    </>
  );
}

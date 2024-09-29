'use client';

import '../../../styles/page.scss';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import FormContainer from '@/components/FormContainer';
import UpdateArticleForm from '@/components/Articles-forms/UpdateArticleForm';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';

export default function UpdateArticlePage() {
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
                <FormContainer title={`Modifier article: ${article?.title}`}>
                  <UpdateArticleForm selectedArticle={article} />
                </FormContainer>
              </>
            ) : (
              <p>No article found</p>
            )}
          </div>
        </div>
      ) : (
        <LoadingPage mention={`Modifier: ${article?.title}`} />
      )}
    </>
  );
}

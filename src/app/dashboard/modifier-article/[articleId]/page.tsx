'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import FakeArticleForm from '@/components/FakeComponents/FakeArticleForm';

// Import dynamique des composants
// ================================================================================================
const DynamicFormContainer = dynamic(
  () => import('@/components/Forms/FormContainer'),
  {
    loading: () => <FakeArticleForm />,
  },
);
const DynamicUpdateArticleForm = dynamic(
  () => import('@/components/Forms/Articles-forms/UpdateArticleForm'),
);
// ================================================================================================

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
                <DynamicFormContainer
                  title={`Modifier article: ${article?.title}`}
                >
                  <DynamicUpdateArticleForm selectedArticle={article} />
                </DynamicFormContainer>
              </>
            ) : (
              <p>No article found</p>
            )}
          </div>
        </div>
      ) : (
        <LoadingPage mention={`Accès à modifier: ${article?.title}...`} />
      )}
    </>
  );
}

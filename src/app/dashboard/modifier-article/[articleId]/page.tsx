'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import LoadingPage from '@/components/LoadingPage';
import usePageLoader from '@/hooks/usePageLoader';
import dynamic from 'next/dynamic';
import SkeletonArticleForm from '@/components/SkeletonComponents/SkeletonArticleForm';

// Import dynamique des composants
// ================================================================================================
const DynamicFormContainer = dynamic(
  () => import('@/components/Forms/FormContainer'),
  {
    loading: () => <SkeletonArticleForm />,
  },
);
const DynamicUpdateArticleForm = dynamic(
  () => import('@/components/Forms/Articles-forms/UpdateArticleForm'),
);
// ================================================================================================

export default function UpdateArticlePage() {
  const { articleId } = useParams();

  // Utilise le hook pour le chargement de la page
  // ===========================================================================================
  const isContentVisible = usePageLoader();

  // Fetch les données de l'article séléctionné par son ID avec useQuery
  // ===========================================================================================
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
  // ===========================================================================================

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

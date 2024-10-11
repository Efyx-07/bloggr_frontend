'use client';

import './ArticlesPage.css';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import SkeletonArticleCard from '@/components/SkeletonComponents/SkeletonArticleCard';
import LoadingPage from '@/components/LoadingPage';
import NoArticle from '@/components/NoArticle';
import ArticlesPageHead from '@/components/PageHeads/ArticlesPageHead';
import dynamic from 'next/dynamic';
import usePageLoader from '@/hooks/usePageLoader';

// Import dynamique des composants
// ================================================================================================
const DynamicArticleCard = dynamic(() => import('@/components/ArticleCard'), {
  loading: () => <SkeletonArticleCard />,
});

// Inverse l'ordre des articles pour obtenir le récent en 1er
// ================================================================================================
const reverseArticles = (articles: readonly Article[]) =>
  [...articles].reverse();
// ================================================================================================

export default function ArticlesPage() {
  // Utilise le hook pour le chargement de la page
  // ===========================================================================================
  const isContentVisible = usePageLoader();

  // Fetch les données de tous les articles avec useQuery
  // ===========================================================================================
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

  // Utilise la fonction pour inverser l'ordre des articles et les stocke dans cet état
  // ===========================================================================================
  const reversedArticles: Article[] | undefined =
    articles && articles.length > 0 ? reverseArticles(articles) : undefined;
  // ===========================================================================================

  return (
    <>
      {isContentVisible ? (
        <div className="page">
          <div
            className={`${articles && articles.length > 0 ? 'content justify-start' : 'content'}`}
          >
            {articles && articles.length > 0 ? (
              <>
                <ArticlesPageHead />
                <div className="article-cards-container">
                  {reversedArticles?.map((article) => (
                    <DynamicArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            ) : (
              <NoArticle />
            )}
          </div>
        </div>
      ) : (
        <LoadingPage mention="Chargement des articles..." />
      )}
    </>
  );
}

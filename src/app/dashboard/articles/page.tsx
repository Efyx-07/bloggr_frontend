'use client';

import './ArticlesPage.css';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import SkeletonArticleCard from '@/components/SkeletonComponents/SkeletonArticleCard';
import { WithPageLoader } from '@/hoc/WithPageLoader';
import useArticlesFilterStore from '@/stores/articlesFilterStore';
import LoadingPage from '@/components/LoadingPage';
import NoArticle from '@/components/NoArticle';
import ArticlesPageHead from '@/components/PageHeads/ArticlesPageHead';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

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
  // Récupère les états du store
  // ===========================================================================================
  const { filter, setFilter } = useArticlesFilterStore();

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

  // Récupère l'état filter stocké dans le store
  // ===========================================================================================
  const filteredArticles = articles?.filter((article) => {
    if (filter === 'published') return article.published;
    if (filter === 'unpublished') return !article.published;
    return true; // Définit 'all' par défaut, retourne tous les articles
  });

  // Utilise la fonction pour inverser l'ordre des articles et les stocke dans cet état
  // ===========================================================================================
  const reversedArticles: Article[] | undefined =
    filteredArticles && filteredArticles.length > 0
      ? reverseArticles(filteredArticles)
      : undefined;

  // Utilise useEffect pour réinitialiser le filtre à "all" lorsque le composant est démonté
  // ===========================================================================================
  useEffect(() => {
    return () => setFilter('all');
  }, [setFilter]);

  // Traite isLoading et error définis dans react query (à maintenir toujours après useEffect)
  // ===========================================================================================
  if (isLoading) return <LoadingPage />;
  if (error) return <p>An error occurred: {error.message}</p>;
  // ===========================================================================================

  return (
    <>
      <WithPageLoader loadingPageMention="Chargement des articles...">
        <div className="page">
          <div
            className={`${articles && articles.length > 0 ? 'content justify-start' : 'content'}`}
          >
            {articles && articles.length > 0 ? (
              <>
                <ArticlesPageHead articles={articles} />
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
      </WithPageLoader>
    </>
  );
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
import HeadTitle from '@/components/Sharables/Others/HeadTitle';
import SkeletonArticleCard from '@/components/SkeletonComponents/SkeletonArticleCard';
import LoadingPage from '@/components/LoadingPage';
import NoArticle from '@/components/NoArticle';
import Button from '@/components/Sharables/Buttons/Button';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import './ArticlesPage.css';

// Import dynamique des composants
// ================================================================================================
const DynamicArticleCard = dynamic(() => import('@/components/ArticleCard'), {
  loading: () => <SkeletonArticleCard />,
});

// Inverse l'ordre des articles pour obtenir le récent en 1er
// ================================================================================================
const reverseArticles = (articles: readonly Article[]) => {
  return [...articles].reverse();
};
// ================================================================================================

export default function ArticlesPage() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();
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

  const reversedArticles: Article[] | undefined =
    articles && articles.length > 0 ? reverseArticles(articles) : undefined;

  const handleNavToNouvelArticle = () => {
    router.push('/dashboard/nouvel-article');
    setIsButtonLoading(true);
    setIsClicked(true);
  };

  setTimeout(() => {
    setIsContentVisible(true);
  }, loadingPageDelay);

  return (
    <>
      {isContentVisible ? (
        <div className="page">
          <div
            className={`${articles && articles.length > 0 ? 'content justify-start' : 'content'}`}
          >
            {articles && articles.length > 0 ? (
              <>
                <HeadTitle title="Mes articles">
                  <Button
                    addedClassName="button-large primary"
                    type="button"
                    name="Nouvel article"
                    onClick={handleNavToNouvelArticle}
                    isLoading={isButtonLoading}
                    isClicked={isClicked}
                    primary
                  />
                </HeadTitle>
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

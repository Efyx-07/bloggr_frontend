'use client';

import '../../styles/page.scss';
import './ArticlePage.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
import HeadTitle from '@/components/Sharables/Others/HeadTitle';
import ArticleCard from '@/components/ArticleCard';
import LoadingPage from '@/components/LoadingPage';
import NoArticle from '@/components/NoArticle';
import PrimaryButton from '@/components/Sharables/Buttons/PrimaryButton';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';

// Inverse l'ordre des articles pour obtenir le récent en 1er
const reverseArticles = (articles: readonly Article[]) => {
  return [...articles].reverse();
};

export default function ArticlesPage() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
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

  setTimeout(() => {
    setIsContentVisible(true);
  }, loadingPageDelay);

  return (
    <>
      {isContentVisible ? (
        <div className="page">
          <div
            className={`${articles && articles.length > 0 ? 'articles-page-content' : 'content'}`}
          >
            {articles && articles.length > 0 ? (
              <>
                <HeadTitle title="Mes articles">
                  <PrimaryButton
                    type="button"
                    name="Nouvel article"
                    onClick={() => router.push('/nouvel-article')}
                  />
                </HeadTitle>
                <div className="article-cards-container">
                  {reversedArticles?.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            ) : (
              <NoArticle />
            )}
          </div>
        </div>
      ) : (
        <LoadingPage mention="Chargement des articles" />
      )}
    </>
  );
}

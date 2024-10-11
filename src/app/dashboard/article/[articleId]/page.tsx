'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import { WithPageLoader } from '@/hoc/WithPageLoader';
import LoadingPage from '@/components/LoadingPage';
import ArticlePageHead from '@/components/PageHeads/ArticlePageHead';
import ArticleFull from '@/components/ArticleFull';

export default function ArticlePage() {
  const { articleId } = useParams();

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
      <WithPageLoader
        loadingPageMention={`Chargement de l'article: ${article?.title}...`}
      >
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
      </WithPageLoader>
    </>
  );
}

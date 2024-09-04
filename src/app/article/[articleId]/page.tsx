'use client';

import MainLayout from '@/app/_layouts/MainLayout';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticles } from '@/services/articles.service';
import Image from 'next/image';

export default function ArticlePage() {
  const { articleId } = useParams();

  const {
    data: articles,
    error,
    isLoading,
  } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  const selectedArticle: Article | undefined = articles?.find(
    (article) => article.id === Number(articleId),
  );

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
            {selectedArticle ? (
              <>
                <div className="image-container">
                  <Image
                    className="img"
                    src={selectedArticle.imageUrl}
                    width={480}
                    height={320}
                    alt={selectedArticle.title}
                    priority
                  />
                </div>
                <h1>{selectedArticle.title}</h1>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedArticle.body }}
                />
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

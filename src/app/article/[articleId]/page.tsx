'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import Image from 'next/image';

export default function ArticlePage() {
  const { articleId } = useParams();

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article>({
    queryKey: ['article', articleId],
    queryFn: () => fetchArticleById(Number(articleId)),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="page">
      <div className="content">
        {article ? (
          <>
            <div className="image-container">
              <Image
                className="img"
                src={article.imageUrl}
                width={480}
                height={320}
                alt={article.title}
                priority
              />
            </div>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: article.body }} />
          </>
        ) : (
          <p>No article found</p>
        )}
      </div>
    </div>
  );
}

'use client';

import '../../../styles/page.scss';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import FormContainer from '@/components/FormContainer';
import UpdateArticleForm from '@/components/Articles-forms/UpdateArticleForm';
import LoadingPage from '@/components/LoadingPage';

export default function UpdateArticlePage() {
  const { articleId } = useParams();

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

  return (
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
  );
}

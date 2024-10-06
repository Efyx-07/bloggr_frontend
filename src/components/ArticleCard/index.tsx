import { Article } from '@/interfaces/article.interface';
import Image from 'next/image';
import ArticleCardActionsBar from './ArticleCardActionsBar';
import ArticleDate from '../ArticleDate';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="w-full container-style">
      <div className="image-container aspect-ratio">
        <Image
          className="image"
          src={article.imageUrl}
          alt={article.title}
          priority
          sizes="100%"
          fill
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h3>{article.title}</h3>
          <div className="date-status">
            <ArticleDate article={article} />
            <div className="published-status">
              {article.published ? (
                <p>Publié</p>
              ) : (
                <p>En attente de publication</p>
              )}
            </div>
          </div>
        </div>
        <ArticleCardActionsBar article={article} />
      </div>
    </div>
  );
}

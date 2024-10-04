import './ArticleCard.scss';
import { Article } from '@/interfaces/article.interface';
import Image from 'next/image';
import ArticleCardActionsBar from './ArticleCardActionsBar';
import ArticleDate from '../ArticleDate';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="article-card">
      <div className="image-container">
        <Image
          className="img"
          src={article.imageUrl}
          alt={article.title}
          priority
          sizes="100%"
          fill
        />
      </div>
      <div className="bottom-part">
        <div className="infos-container">
          <h3>{article.title}</h3>
          <ArticleDate article={article} />
          <div
            className="body-snippet"
            dangerouslySetInnerHTML={{
              __html: article.body.slice(0, 100) + ' ...',
            }}
          />
        </div>
        <ArticleCardActionsBar article={article} />
      </div>
    </div>
  );
}

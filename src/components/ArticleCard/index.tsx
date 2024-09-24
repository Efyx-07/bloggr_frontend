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
          //width={3000}
          //height={2000}
          alt={article.title}
          priority
          fill
        />
      </div>
      <ArticleDate article={article} />
      <p>{article.title}</p>
      <ArticleCardActionsBar article={article} />
    </div>
  );
}

import './ArticleCard.scss';
import { Article } from '@/interfaces/article.interface';
import Image from 'next/image';
import ArticleCardActionsBar from './ArticleCardActionsBar';

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
          width={480}
          height={320}
          alt={article.title}
          priority
        />
      </div>
      <p>{article.title}</p>
      <ArticleCardActionsBar />
    </div>
  );
}

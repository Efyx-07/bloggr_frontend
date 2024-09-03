import { Article } from '@/interfaces/article.interface';
import Image from 'next/image';

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
          width={350}
          height={350}
          alt={article.title}
          priority
        />
      </div>
      <p>{article.title}</p>
    </div>
  );
}

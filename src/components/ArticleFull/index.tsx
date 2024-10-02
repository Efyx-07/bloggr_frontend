import './ArticleFull.scss';
import { Article } from '@/interfaces/article.interface';
import Image from 'next/image';

interface ArticleFullProps {
  article: Article;
}

export default function ArticleFull({ article }: ArticleFullProps) {
  return (
    <div className="article-full">
      <div className="image-container">
        <Image
          className="img"
          src={article.imageUrl}
          alt={article.title}
          sizes="100%"
          fill
          priority
        />
      </div>
      <div className="article-text-container">
        <h1 className="article-title">{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </div>
  );
}

import './ArticleFull.scss';
import { Article } from '@/interfaces/article.interface';
import Image from 'next/image';
import Separator from '../Sharables/Others/Separator';

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
        <div className="article-header">
          <h1 className="article-title">{article.title}</h1>
          {article.keywords && (
            <div className="keywords-container">
              {article.keywords.map((keyword) => (
                <p className="keyword" key={keyword.id}>
                  {keyword.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <Separator />
        <div
          className="article-bbody"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </div>
    </div>
  );
}

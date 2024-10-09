import { Article } from '@/interfaces/article.interface';
import { formatDate, timeAgo } from '@/utils/formatDate';

interface ArticleDateProps {
  article: Article;
}

export default function ArticleDate({ article }: ArticleDateProps) {
  const creationDate: Date = new Date(article.creationDate);
  const lastUpdate: Date = new Date(article.lastUpdate);

  return (
    <div className="flex items-center gap-1 text-xs">
      <p>créé: {formatDate(creationDate)}</p>
      {creationDate.getTime() !== lastUpdate.getTime() && (
        <>
          <p>|</p>
          <p className="last-update">maj: {timeAgo(lastUpdate)}</p>
        </>
      )}
    </div>
  );
}

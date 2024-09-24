import './ArticleDate.scss';
import { Article } from '@/interfaces/article.interface';
import { format, formatDistanceToNow } from 'date-fns';

interface ArticleDateProps {
  article: Article;
}

export default function ArticleDate({ article }: ArticleDateProps) {
  const creationDate: Date = new Date(article.creationDate);
  const lastUpdate: Date = new Date(article.lastUpdate);

  const formatDate = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };
  const timeAgo = (date: Date): string => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="date-infos">
      <p className="creation-date">créé: {formatDate(creationDate)}</p>
      {creationDate.getTime() !== lastUpdate.getTime() && (
        <>
          <p>/</p>
          <p className="last-update">maj: {timeAgo(lastUpdate)}</p>
        </>
      )}
    </div>
  );
}

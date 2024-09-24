import './ArticleCardActionsBar.scss';
import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
import CardButton from './CardButton';
import DeleteButton from './DeleteButton';

interface ArticleCardActionsBarProps {
  article: Article;
}

export default function ArticleCardActionsBar({
  article,
}: ArticleCardActionsBarProps) {
  const router = useRouter();

  return (
    <div className="actions-bar">
      <DeleteButton className="card-button" selectedArticle={article} />
      <CardButton
        className="card-button"
        onClick={() => router.push(`/modifier-article/${article.id}`)}
        label="Modifier"
      />
      <CardButton
        className="card-button"
        onClick={() => router.push(`/article/${article.id}`)}
        label="Voir"
      />
    </div>
  );
}

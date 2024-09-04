import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
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
      <button onClick={() => router.push(`/article/${article.id}`)}>
        Voir
      </button>
      <button onClick={() => router.push(`/modifier-article/${article.id}`)}>
        Modifier
      </button>
      <DeleteButton selectedArticle={article} />
    </div>
  );
}

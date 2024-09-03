import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';

interface ArticleCardActionsBarProps {
  article: Article;
}

export default function ArticleCardActionsBar({
  article,
}: ArticleCardActionsBarProps) {
  const router = useRouter();

  return (
    <div className="actions-bar">
      <button>Voir</button>
      <button onClick={() => router.push(`/modifier-article/${article.id}`)}>
        Modifier
      </button>
      <button>Supprimer</button>
    </div>
  );
}

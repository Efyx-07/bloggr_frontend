import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
import SmallButton from '../Sharables/Buttons/SmallButton';
import { useState } from 'react';
import useModalStore from '@/stores/modalStore';

interface ArticleCardActionsBarProps {
  article: Article;
}

// Gestion des boutons d'actions de la carte
// ===========================================================================================
export default function ArticleCardActionsBar({
  article,
}: ArticleCardActionsBarProps) {
  const [isLoadingModify, setIsLoadingModify] = useState<boolean>(false);
  const [isLoadingView, setIsLoadingView] = useState<boolean>(false);
  const { openDeleteArticleModal } = useModalStore();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:grid grid-cols-3">
        <SmallButton
          onClick={() => openDeleteArticleModal(article.id)}
          label="Supprimer"
        />
        <SmallButton
          onClick={() => {
            router.push(`/dashboard/modifier-article/${article.id}`);
            setIsLoadingModify(true);
          }}
          label="Modifier"
          isLoading={isLoadingModify}
        />
        <SmallButton
          onClick={() => {
            router.push(`/dashboard/article/${article.id}`);
            setIsLoadingView(true);
          }}
          label="Voir"
          isLoading={isLoadingView}
        />
      </div>
    </>
  );
}

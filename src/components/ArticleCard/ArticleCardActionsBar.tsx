import './ArticleCardActionsBar.scss';
import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
import SmallButton from '../Sharables/Buttons/SmallButton';
import ModalDeleteArticle from '../ModalDeleteArticle';
import { useState } from 'react';

interface ArticleCardActionsBarProps {
  article: Article;
}

// Gestion des boutons d'actions de la carte + gestion modale de suppression d'un article
// ===========================================================================================
export default function ArticleCardActionsBar({
  article,
}: ArticleCardActionsBarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingModify, setIsLoadingModify] = useState<boolean>(false);
  const [isLoadingView, setIsLoadingView] = useState<boolean>(false);
  const router = useRouter();

  const openDeleteModal = () => setIsModalOpen(true);

  const closeDeleteModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="
        flex flex-wrap gap-2
        s:grid grid-cols-3
      "
      >
        <SmallButton onClick={openDeleteModal} label="Supprimer" />
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
      <ModalDeleteArticle
        isModalOpen={isModalOpen}
        selectedArticle={article}
        closeModal={closeDeleteModal}
      />
    </>
  );
}

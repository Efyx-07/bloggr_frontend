import './ArticleCardActionsBar.scss';
import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
import CardButton from './CardButton';
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
  const router = useRouter();

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="actions-bar">
        <CardButton
          className="card-button"
          onClick={openDeleteModal}
          label="Supprimer"
        />
        <CardButton
          className="card-button"
          onClick={() =>
            router.push(`/dashboard/modifier-article/${article.id}`)
          }
          label="Modifier"
        />
        <CardButton
          className="card-button"
          onClick={() => router.push(`/dashboard/article/${article.id}`)}
          label="Voir"
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

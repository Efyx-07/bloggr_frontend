'use client';

import '../Modal-common-style.css';
import ModalCloseIcon from '../ModalComponents/ModalCloseIcon';
import ErrorView from '../ModalComponents/ErrorView';
import SuccessView from '../ModalComponents/SuccessView';
import ActionView from '../ModalComponents/ActionView';
import DeleteButton from './DeleteButton';
import useModalStore from '@/stores/modalStore';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import { useState } from 'react';

export default function ModalDeleteArticle() {
  const [hasSucceed, setHasSucceed] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  // Récupère les états et méthodes du store pour la modale
  // ===========================================================================================
  const { isDeleteArticleModalOpen, modalArticleId, closeDeleteArticleModal } =
    useModalStore();

  // Fetch les données de l'article sélectionné par son ID avec useQuery
  // ===========================================================================================
  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article>({
    queryKey: ['article', modalArticleId],
    queryFn: () => fetchArticleById(Number(modalArticleId)),
  });
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue: {error.message}</p>;

  // Gère les mentions de la modale
  // ===========================================================================================
  const mention: string = 'Etes-vous sûr de vouloir supprimer cet article ?';
  const successMention: string = `Votre article: <strong>"${article?.title}"</strong> a été correctement supprimé !`;

  // Gère les états en cas de succès ou d'échec de l'opération
  // ===========================================================================================
  const handleSuccess = () => setHasSucceed(true);
  const handleFailure = () => setHasFailed(true);

  // Ferme et réinitialise la modale
  // ===========================================================================================
  const closeAndResetModal = () => {
    closeDeleteArticleModal();
    setHasSucceed(false);
    setHasFailed(false);
  };
  // ===========================================================================================

  return (
    <div
      className={`modal-container transition-opacity duration-200 ease
        ${!isDeleteArticleModalOpen ? 'invisible opacity-0' : 'visible opacity-100'}`}
    >
      <div className="modal">
        <ModalCloseIcon onClick={closeAndResetModal} />
        {hasSucceed ? (
          <SuccessView
            successMention={successMention}
            closeAndResetModal={closeAndResetModal}
          />
        ) : hasFailed ? (
          <ErrorView closeModal={closeAndResetModal} />
        ) : (
          // S'assure que article est défini
          article && (
            <ActionView
              mention={mention}
              article={article}
              closeModal={closeDeleteArticleModal}
              handleSuccess={handleSuccess}
              handleFailure={handleFailure}
              ActionButton={DeleteButton}
            />
          )
        )}
      </div>
    </div>
  );
}

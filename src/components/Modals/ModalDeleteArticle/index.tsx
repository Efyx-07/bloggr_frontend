'use client';

import '../Modal-common-style.css';
import Button from '@/components/Sharables/Buttons/Button';
import DeleteButton from './DeleteButton';
import { Icon } from '@iconify/react';
import useModalStore from '@/stores/modalStore';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';
import { useState } from 'react';

export default function ModalDeleteArticle() {
  const { isDeleteArticleModalOpen, modalArticleId, closeDeleteArticleModal } =
    useModalStore();
  const [hasSucceed, setHasSucceed] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

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
        <div className="modal-close-icon-container">
          <Icon
            icon="fa:close"
            onClick={closeAndResetModal}
            className="modal-close-icon"
          />
        </div>
        {hasSucceed ? (
          <SuccessView closeModal={closeAndResetModal} />
        ) : hasFailed ? (
          <ErrorView closeModal={closeAndResetModal} />
        ) : (
          article && (
            <>
              <div className="modal-text-container">
                <p>Etes-vous sûr de vouloir supprimer cet article ?</p>
                <p className="modal-article-title">{article.title}</p>
              </div>
              <div className="buttons-container">
                <Button
                  addedClassName="button-medium secondary"
                  type="reset"
                  name="Annuler"
                  onClick={closeDeleteArticleModal}
                />
                <DeleteButton
                  selectedArticle={article}
                  onSuccess={handleSuccess}
                  onError={handleFailure}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

// Composant local pour la vue de la modale en cas de succès
// ===========================================================================================
interface SuccessViewProps {
  closeModal: () => void;
}
function SuccessView({ closeModal }: SuccessViewProps) {
  return (
    <>
      <p>Article supprimé avec succès !</p>
      <div className="buttons-container">
        <Button
          addedClassName="button-medium primary"
          type="reset"
          name="Fermer"
          onClick={closeModal}
        />
      </div>
    </>
  );
}

// Composant local pour la vue de la modale en cas d'erreur
// ===========================================================================================
interface ErrorViewProps {
  closeModal: () => void;
}
function ErrorView({ closeModal }: ErrorViewProps) {
  return (
    <>
      <p>Une erreur est survenue, merci de rééssayer plus tard...</p>
      <div className="buttons-container">
        <Button
          addedClassName="button-medium primary"
          type="reset"
          name="Fermer"
          onClick={closeModal}
        />
      </div>
    </>
  );
}

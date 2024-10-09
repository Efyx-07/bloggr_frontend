'use client';

import '../Modal-common-style.css';
import ModalCloseIcon from '../ModalComponents/ModalCloseIcon';
import ErrorView from '../ModalComponents/ErrorView';
import SuccessView from '../ModalComponents/SuccessView';
import { useQuery } from '@tanstack/react-query';
import { fetchArticleById } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import useModalStore from '@/stores/modalStore';
import Button from '@/components/Sharables/Buttons/Button';
import PublishArticleButton from './PublishArticleButton';
import { useState } from 'react';

export default function ModalPublishArticle() {
  const [hasSucceed, setHasSucceed] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  // Récupère les états et méthodes du store pour la modale
  // ===========================================================================================
  const {
    isPublishArticleModalOpen,
    modalArticleId,
    closePublishArticleModal,
  } = useModalStore();

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

  // Gère les mentions de la modale selon le statut de publication de l'article
  // ===========================================================================================
  const mention: string = article?.published
    ? 'Etes-vous sûr de vouloir dépublier cet article ?'
    : 'Etes-vous sûr de vouloir publier cet article ?';

  const successMention: string = article?.published
    ? `Votre article: <strong>"${article?.title}"</strong> a été correctement publié !`
    : `Votre article: <strong>"${article?.title}"</strong> est désormais invisible !`;

  // Gère les états en cas de succès ou d'échec de l'opération
  // ===========================================================================================
  const handleSuccess = () => setHasSucceed(true);
  const handleFailure = () => setHasFailed(true);

  // Ferme et réinitialise la modale
  // ===========================================================================================
  const closeAndResetModal = () => {
    closePublishArticleModal();
    setHasSucceed(false);
    setHasFailed(false);
  };
  // ===========================================================================================

  return (
    <div
      className={`modal-container transition-opacity duration-200 ease 
        ${!isPublishArticleModalOpen ? 'invisible opacity-0' : 'visible opacity-100'}`}
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
          // S'assure que article est défini afin de ne pas mettre de conditionnelle dans le composant bouton
          article && (
            <ActionView
              mention={mention}
              article={article}
              closePublishArticleModal={closePublishArticleModal}
              handleSuccess={handleSuccess}
              handleFailure={handleFailure}
            />
          )
        )}
      </div>
    </div>
  );
}

// Composant local pour la vue de la modale pour l'action Publier / Dépublier
// ===========================================================================================
interface ActionViewProps {
  mention: string;
  article: Article;
  closePublishArticleModal: () => void;
  handleSuccess: () => void;
  handleFailure: () => void;
}
function ActionView({
  mention,
  article,
  closePublishArticleModal,
  handleSuccess,
  handleFailure,
}: ActionViewProps) {
  return (
    <>
      <div className="modal-text-container">
        <p>{mention}</p>
        <p className="modal-article-title">{article?.title}</p>
      </div>
      <div className="buttons-container">
        <Button
          addedClassName="button-medium secondary"
          type="reset"
          name="Annuler"
          onClick={closePublishArticleModal}
        />
        <PublishArticleButton
          selectedArticle={article}
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </>
  );
}

'use client';

import './ModalPublishArticle.css';
import { useQuery } from '@tanstack/react-query';
import { fetchArticleById } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import useModalStore from '@/stores/modalStore';
import Button from '@/components/Sharables/Buttons/Button';
import PublishArticleButton from './PublishArticleButton';
import { Icon } from '@iconify/react';
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
      className={`overlay transition-opacity duration-200 ease 
        ${!isPublishArticleModalOpen ? 'invisible opacity-0' : 'visible opacity-100'}`}
    >
      <div className="publish-article-modal">
        <div className="flex justify-end">
          <Icon
            icon="fa:close"
            onClick={closeAndResetModal}
            className="text-sm hover:text-accent cursor-pointer"
          />
        </div>
        {hasSucceed ? (
          <SuccessView
            successMention={successMention}
            closeAndResetModal={closeAndResetModal}
          />
        ) : hasFailed ? (
          <ErrorView closeAndResetModal={closeAndResetModal} />
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

// Composant local pour la vue de la modale en cas de succès
// ===========================================================================================
interface SuccessViewProps {
  successMention: string;
  closeAndResetModal: () => void;
}
function SuccessView({ successMention, closeAndResetModal }: SuccessViewProps) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: successMention }} />
      <div className="buttons-container">
        <Button
          addedClassName="button-medium primary"
          type="reset"
          name="Fermer"
          onClick={closeAndResetModal}
        />
      </div>
    </>
  );
}

// Composant local pour la vue de la modale en cas d'erreur
// ===========================================================================================
interface ErrorViewProps {
  closeAndResetModal: () => void;
}
function ErrorView({ closeAndResetModal }: ErrorViewProps) {
  return (
    <>
      <p>Une erreur est survenue, merci de rééssayer plus tard...</p>
      <div className="buttons-container">
        <Button
          addedClassName="button-medium primary"
          type="reset"
          name="Fermer"
          onClick={closeAndResetModal}
        />
      </div>
    </>
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
      <div className="flex flex-col gap-2">
        <p>{mention}</p>
        <p className='text-xl font font-bold'>{article?.title}</p>
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

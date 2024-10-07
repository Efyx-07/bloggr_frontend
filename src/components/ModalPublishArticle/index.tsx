'use client';

import './ModalPublishArticle.css';
import { useQuery } from '@tanstack/react-query';
import { fetchArticleById } from '@/services/articles.service';
import { Article } from '@/interfaces/article.interface';
import useModalStore from '@/stores/modalStore';
import Button from '../Sharables/Buttons/Button';
import { Icon } from '@iconify/react';

export default function ModalPublishArticle() {
    // Récupère les états et méthodes du store
  // ===========================================================================================
  const {
    isPublishArticleModalOpen,
    modalArticleId,
    closePublishArticleModal,
  } = useModalStore();

  // Fetch les données de l'article sélectionné avec useQuery
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
  if (error) return <p>An error occurred: {error.message}</p>;
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
            onClick={closePublishArticleModal}
            className="text-sm hover:text-accent cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Etes-vous sûr de vouloir publier cet article ?</p>
          <h2>{article?.title}</h2>
        </div>
        <div className="buttons-container">
          <Button
            addedClassName="button-medium secondary"
            type="reset"
            name="Annuler"
            onClick={closePublishArticleModal}
          />
          {/* <DeleteButton selectedArticle={selectedArticle} /> */}
        </div>
      </div>
    </div>
  );
}

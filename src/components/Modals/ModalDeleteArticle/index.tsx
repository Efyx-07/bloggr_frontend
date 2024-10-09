'use client';

import '../Modal-common-style.css';
import Button from '@/components/Sharables/Buttons/Button';
import DeleteButton from './DeleteButton';
import { Icon } from '@iconify/react';
import useModalStore from '@/stores/modalStore';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { fetchArticleById } from '@/services/articles.service';

export default function ModalDeleteArticle() {
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
            onClick={closeDeleteArticleModal}
            className="modal-close-icon"
          />
        </div>
        {article && (
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
              <DeleteButton selectedArticle={article} closeModal={closeDeleteArticleModal}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

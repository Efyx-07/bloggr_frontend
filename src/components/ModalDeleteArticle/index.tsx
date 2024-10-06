import { Article } from '@/interfaces/article.interface';
import ModalSecondaryButton from '../Sharables/Buttons/ModalSecondaryButton';
import DeleteButton from './DeleteButton';
import { Icon } from '@iconify/react';
import './ModalDeleteArticle.css';

interface ModalDeleteArticleProps {
  selectedArticle: Article;
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function ModalDeleteArticle({
  selectedArticle,
  isModalOpen,
  closeModal,
}: ModalDeleteArticleProps) {
  return (
    <div className={`
        overlay 
        transition-opacity duration-200 ease 
        ${!isModalOpen ? 'invisible opacity-0' : 'visible opacity-100'}
      `}
    >
      <div className="delete-modal">
        <div className="flex justify-end">
          <Icon
            icon="fa:close"
            onClick={closeModal}
            className="text-sm hover:text-accent cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Etes-vous sûr de vouloir supprimer cet article ?</p>
          <h2>{selectedArticle.title}</h2>
        </div>
        <div className="buttons-container">
          <ModalSecondaryButton
            type="reset"
            name="Annuler"
            onClick={closeModal}
          />
          <DeleteButton selectedArticle={selectedArticle} />
        </div>
      </div>
    </div>
  );
}

import '../Modal-common-style.css';
import { Article } from '@/interfaces/article.interface';
import Button from '@/components/Sharables/Buttons/Button';
import DeleteButton from './DeleteButton';
import { Icon } from '@iconify/react';

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
    <div
      className={`overlay transition-opacity duration-200 ease
        ${!isModalOpen ? 'invisible opacity-0' : 'visible opacity-100'}`}
    >
      <div className="modal">
        <div className="modal-close-icon-container">
          <Icon
            icon="fa:close"
            onClick={closeModal}
            className="modal-close-icon"
          />
        </div>
        <div className="modal-text-container">
          <p>Etes-vous sûr de vouloir supprimer cet article ?</p>
          <p className='modal-article-title'>{selectedArticle.title}</p>
        </div>
        <div className="buttons-container">
          <Button
            addedClassName="button-medium secondary"
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

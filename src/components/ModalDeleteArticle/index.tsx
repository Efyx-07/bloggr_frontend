import { Article } from '@/interfaces/article.interface';
import SecondaryButton from '../Sharables/Buttons/SecondaryButton';
import DeleteButton from '../ArticleCard/DeleteButton';
import './ModalDeleteArticle.scss';
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
    <div className={`modal-overlay ${!isModalOpen ? 'hidden' : ''}`}>
      <div className="modal-delete-article">
        <div className="modal-head">
          <div className="close-icon-container">
            <Icon icon="ei:close" className="close-icon" onClick={closeModal} />
          </div>
        </div>
        <div className="text-container">
          <p>Etes-vous sûr de vouloir supprimer cet article ?</p>
          <h3>{selectedArticle.title}</h3>
        </div>
        <div className="buttons-container">
          <SecondaryButton type="reset" name="Annuler" onClick={closeModal} />
          <DeleteButton selectedArticle={selectedArticle} />
        </div>
      </div>
    </div>
  );
}

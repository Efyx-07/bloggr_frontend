import { Article } from '@/interfaces/article.interface';
import Button from '@/components/Sharables/Buttons/Button';
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
    <div
      className={`
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
          <p className='text-xl font font-bold'>{selectedArticle.title}</p>
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

import { Article } from '@/interfaces/article.interface';
import ModalSecondaryButton from '../Sharables/Buttons/ModalSecondaryButton';
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
      className={`
          fixed top-0 left-0 z-50
          w-[100vw] h-[100dvh]
          bg-black75
          flex justify-center items-center
          ${!isModalOpen ? 'invisible' : 'visible'}
        `}
    >
      <div
        className="
          w-full max-w-[27rem]
          bg-white
          border rounded-lg
          flex flex-col gap-8
          pt-4 pr-4 pb-6 pl-6
        "
      >
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
        <div className="flex justify-end gap-2">
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

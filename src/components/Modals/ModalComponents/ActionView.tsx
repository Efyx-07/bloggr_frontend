import { Article } from '@/interfaces/article.interface';
import Button from '@/components/Sharables/Buttons/Button';

interface ActionViewProps {
  mention: string;
  article: Article;
  closeModal: () => void;
  handleSuccess: () => void;
  handleFailure: () => void;
  ActionButton: React.ElementType;
}

export default function ActionView({
  mention,
  article,
  closeModal,
  handleSuccess,
  handleFailure,
  ActionButton,
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
          onClick={closeModal}
        />
        <ActionButton
          selectedArticle={article}
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </>
  );
}

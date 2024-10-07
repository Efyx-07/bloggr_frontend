import HeadTitle from '../Sharables/Others/HeadTitle';
import Button from '../Sharables/Buttons/Button';
import { Article } from '@/interfaces/article.interface';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useModalStore from '@/stores/modalStore';

interface ArticlePageHeadProps {
  article: Article;
}

export default function ArticlePageHead({ article }: ArticlePageHeadProps) {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();
  const { openPublishArticleModal } = useModalStore();

  // Navigue vers la page "modifier" de l'article selectionné
  // ===========================================================================================
  const navToModifyArticle = () => {
    router.push(`/dashboard/modifier-article/${article.id}`);
    setIsButtonLoading(true);
    setIsClicked(true);
  };
  // ===========================================================================================

  return (
    <HeadTitle title="Mon article">
      <div
        className="w-full s:w-3/6
          flex justify-start s:justify-end gap-2"
      >
        <Button
          addedClassName="button-large primary"
          type="button"
          name="Modifier"
          onClick={navToModifyArticle}
          isLoading={isButtonLoading}
          isClicked={isClicked}
          primary
        />
        {/* Ouvre la modale de changement de statut de publication de l'article */}
        <Button
          addedClassName="button-large tertiary"
          type="button"
          name={article.published ? 'Dépublier' : 'Publier'}
          onClick={() => openPublishArticleModal(article.id)}
        />
      </div>
    </HeadTitle>
  );
}

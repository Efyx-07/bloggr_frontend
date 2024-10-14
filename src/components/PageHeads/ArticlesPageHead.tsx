import { useState } from 'react';
import ArticleSortDropdown from '../ArticleSortDropdown';
import Button from '../Sharables/Buttons/Button';
import HeadTitle from '../Sharables/Others/HeadTitle';
import { useRouter } from 'next/navigation';

export default function ArticlesPageHead() {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();

  // Navigue vers la page Nouvel-article
  // ===========================================================================================
  const handleNavToNouvelArticle = () => {
    router.push('/dashboard/nouvel-article');
    setIsButtonLoading(true);
    setIsClicked(true);
  };
  // ===========================================================================================

  return (
    <HeadTitle title="Mes articles">
      <div className="w-full sm:w-4/6 flex justify-start sm:justify-end items-center gap-4 md:gap-8">
        <ArticleSortDropdown />
        <Button
          addedClassName="button-large primary"
          type="button"
          name="Nouvel article"
          onClick={handleNavToNouvelArticle}
          isLoading={isButtonLoading}
          isClicked={isClicked}
          primary
        />
      </div>
    </HeadTitle>
  );
}

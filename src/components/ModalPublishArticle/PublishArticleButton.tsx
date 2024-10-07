import { Article } from '@/interfaces/article.interface';
import { useMutation } from '@tanstack/react-query';
import { updateArticlePublishedStatus } from '@/services/articles.service';
import Button from '../Sharables/Buttons/Button';
import { useState } from 'react';

interface PublishArticleButtonProps {
  selectedArticle: Article | undefined;
}

export default function PublishArticleButton({
  selectedArticle,
}: PublishArticleButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // Gère le cas où l'article n'est pas défini
  // ===========================================================================================
  if (!selectedArticle) return null;

  // Création d'une mutation pour modifier le statut de publication de l'article selectionné
  // ===========================================================================================
  const mutation = useMutation({
    mutationFn: async ({
      id,
      published,
    }: {
      id: Article['id'];
      published: Article['published'];
    }) => {
      await updateArticlePublishedStatus(id, published);
    },
    onSuccess: () => {
      console.log('article published status changed');
    },
    onError: (error: Error) => {
      setIsLoading(false);
      setIsClicked(false);
      console.error('Error:', error.message);
    },
  });

  // Modifie le statut de publication de l'article
  // ===========================================================================================
  const handlePublishedStatusToggle = () => {
    setIsLoading(true);
    setIsClicked(true);
    mutation.mutate({
      id: selectedArticle.id,
      published: !selectedArticle.published, // Inverse le statut de publication de l'article
    });
  };
  // ===========================================================================================

  return (
    <Button
      addedClassName="button-medium primary"
      type="button"
      name={selectedArticle.published ? 'Dépublier' : 'Publier'}
      onClick={handlePublishedStatusToggle}
      isLoading={isLoading}
      isClicked={isClicked}
      primary
    />
  );
}

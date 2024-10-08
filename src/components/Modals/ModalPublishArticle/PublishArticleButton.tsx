import { Article } from '@/interfaces/article.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateArticlePublishedStatus } from '@/services/articles.service';
import Button from '@/components/Sharables/Buttons/Button';
import { useState } from 'react';

interface PublishArticleButtonProps {
  selectedArticle: Article;
  onSuccess: () => void;
}

export default function PublishArticleButton({
  selectedArticle,
  onSuccess,
}: PublishArticleButtonProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // Création d'une mutation pour modifier le statut de publication de l'article selectionné
  // ===========================================================================================
  const mutation = useMutation({
    mutationFn: async () => {
      await updateArticlePublishedStatus(
        selectedArticle.id,
        !selectedArticle.published,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article'] });
      setIsLoading(false);
      setIsClicked(false);
      onSuccess();
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
    mutation.mutate();
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

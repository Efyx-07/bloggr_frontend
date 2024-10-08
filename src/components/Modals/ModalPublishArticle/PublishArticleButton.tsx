import { Article } from '@/interfaces/article.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateArticlePublishedStatus } from '@/services/articles.service';
import Button from '@/components/Sharables/Buttons/Button';

interface PublishArticleButtonProps {
  selectedArticle: Article | undefined;
  onSuccess: () => void;
}

export default function PublishArticleButton({
  selectedArticle,
  onSuccess,
}: PublishArticleButtonProps) {
  const queryClient = useQueryClient();

  // Gère le cas où l'article n'est pas défini
  // ===========================================================================================
  if (!selectedArticle) return null;

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
      onSuccess();
      console.log('article published status changed');
    },
    onError: (error: Error) => {
      console.error('Error:', error.message);
    },
  });

  // Modifie le statut de publication de l'article
  // ===========================================================================================
  const handlePublishedStatusToggle = () => {
    mutation.mutate();
  };
  // ===========================================================================================

  return (
    <Button
      addedClassName="button-medium primary"
      type="button"
      name={selectedArticle.published ? 'Dépublier' : 'Publier'}
      onClick={handlePublishedStatusToggle}
      //isLoading={isButtonLoading}
      //isClicked={isClicked}
      primary
    />
  );
}

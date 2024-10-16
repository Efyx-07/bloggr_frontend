import { Article } from '@/interfaces/article.interface';
import { deleteArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/Sharables/Buttons/Button';
import { useState } from 'react';

interface DeleteButtonProps {
  selectedArticle: Article;
  onSuccess: () => void;
  onError: () => void;
}

export default function DeleteButton({
  selectedArticle,
  onSuccess,
  onError,
}: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Création d'une mutation pour supprimer l'image de Vercel blob et supprimer l'article
  // ===========================================================================================
  const mutation = useMutation({
    mutationFn: async () => {
      await deleteFromVercelBlob(selectedArticle.imageUrl);
      await deleteArticleById(selectedArticle.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setIsLoading(false);
      setIsClicked(false);
      onSuccess();
    },
    onError: () => {
      setIsLoading(false);
      setIsClicked(false);
      onError();
    },
  });

  // Supprime l'article
  // ===========================================================================================
  const handleDeleteArticle = () => {
    setIsLoading(true);
    setIsClicked(true);
    mutation.mutate();
  };
  // ===========================================================================================

  return (
    <Button
      addedClassName="button-medium primary"
      type="button"
      name="Supprimer"
      onClick={handleDeleteArticle}
      isLoading={isLoading}
      isClicked={isClicked}
      primary
    />
  );
}

import { Article } from '@/interfaces/article.interface';
import { deleteArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../Sharables/Buttons/Button';
import { useState } from 'react';

interface DeleteButtonProps {
  selectedArticle: Article;
}

export default function DeleteButton({ selectedArticle }: DeleteButtonProps) {
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
    },
    onError: (error: any) => {
      setIsLoading(false);
      setIsClicked(false);
      console.error('Error removing article:', error);
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
      name="Confirmer"
      onClick={handleDeleteArticle}
      isLoading={isLoading}
      isClicked={isClicked}
      primary
    />
  );
}

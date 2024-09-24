import { Article } from '@/interfaces/article.interface';
import { deleteArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';

interface DeleteButtonProps {
  selectedArticle: Article;
}

export default function DeleteButton({ selectedArticle }: DeleteButtonProps) {
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
      console.error('Error removing article:', error);
    },
  });

  // Supprime l'article
  // ===========================================================================================
  const handleDeleteArticle = () => {
    mutation.mutate();
  };

  return (
    <PrimaryButton
      type="button"
      name="Confirmer"
      onClick={handleDeleteArticle}
    />
  );
}

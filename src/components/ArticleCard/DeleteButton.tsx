import { Article } from '@/interfaces/article.interface';
import { deleteArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteButtonProps {
  selectedArticle: Article;
}

export default function DeleteButton({ selectedArticle }: DeleteButtonProps) {
  const queryClient = useQueryClient();

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

  const handleDeleteArticle = () => {
    mutation.mutate();
  };

  return <button onClick={handleDeleteArticle}>Supprimer</button>;
}

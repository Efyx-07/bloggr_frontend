import '@/styles/UserForm.scss';
import { Article } from '@/interfaces/article.interface';
import { updateArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob, loadBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import InputField from '../Form-fields/InputField';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';
import ImageInputField from '../Form-fields/ImageInputField';
import TextEditorField from '../Form-fields/TextEditorField';

interface UpdateArticleFormProps {
  selectedArticle: Article;
}

export default function UpdateArticleForm({
  selectedArticle,
}: UpdateArticleFormProps) {
  const [title, setTitle] = useState<Article['title']>(selectedArticle.title);
  const [previewUrl, setPreviewUrl] = useState<Article['imageUrl'] | null>(
    selectedArticle.imageUrl,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [body, setBody] = useState<Article['body']>(selectedArticle.body);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Création d'une mutation pour mettre à jour un article
  // ===========================================================================================
  const mutation = useMutation({
    mutationFn: async () => {
      let imageUrl = previewUrl || '';

      if (selectedFile) {
        // Efface l'ancienne image de vercel blob si une nouvelle est choisie
        await deleteFromVercelBlob(selectedArticle.imageUrl);
        const newBlob = await loadBlob(selectedFile);
        if (newBlob) {
          imageUrl = newBlob.url;
        } else {
          throw new Error('Failed to upload new image');
        }
      }
      // Met à jour l'article avec le service article
      await updateArticleById(selectedArticle.id, title, imageUrl, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/articles');
    },
    onError: (error: any) => {
      console.error('Failed to update product:', error);
    },
  });

  // Gère le changement du champ Image
  // ===========================================================================================
  const handleFileChange = () => {
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Efface la preview
  // ===========================================================================================
  const deletePreview = (): void => {
    setPreviewUrl(null);
  };

  // Soumet le formulaire pour la création de l'article
  // ===========================================================================================
  const handleUpdateArticle = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    mutation.mutate();
  };

  // Utilise useEffect pour supprimer l'URL de la preview au démontage du compoosant
  // ===========================================================================================
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form onSubmit={handleUpdateArticle}>
      <InputField
        id="title"
        label="Titre de l'article"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <ImageInputField
        id="imageUrl"
        label={"Image de l'article"}
        previewUrl={previewUrl}
        onClick={deletePreview}
        onChange={handleFileChange}
        inputRef={inputFileRef}
        required
      />
      <TextEditorField
        id="body"
        label="Corps de l'article"
        name="body"
        value={body}
        onChange={(value: string) => setBody(value)}
        required
      />
      <PrimaryButton type="submit" name="Modifier l'article" />
    </form>
  );
}

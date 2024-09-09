'use client';

import '@/assets/sass/UserForm.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { createArticle } from '@/services/articles.service';
import { useRouter } from 'next/navigation';
import { loadBlob } from '@/services/vercel-blob.service';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';
import InputField from '../Form-fields/InputField';
import ImageInputField from '../Form-fields/ImageInputField';
import TextEditorField from '../Form-fields/TextEditorField';

export default function CreateArticleForm() {
  const [title, setTitle] = useState<Article['title']>('');
  const [previewUrl, setPreviewUrl] = useState<Article['imageUrl'] | null>(
    null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [body, setBody] = useState<Article['body']>('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Création d'une mutation pour créer un nouvel article
  // ===========================================================================================
  const mutation = useMutation({
    mutationFn: async (newArticle: {
      title: Article['title'];
      imageUrl: Article['imageUrl'];
      body: Article['body'];
    }) => {
      // Crée l'article avec le service article
      await createArticle(
        newArticle.title,
        newArticle.imageUrl,
        newArticle.body,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/articles');
    },
    onError: (error: any) => {
      console.error('Failed to create article', error);
    },
  });

  // Gère le changement du champ Image
  // ===========================================================================================
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  // Efface la preview
  // ===========================================================================================
  const deletePreview = (): void => {
    setPreviewUrl(null);
  };

  // Soumet le formulaire pour la création de l'article
  // ===========================================================================================
  const handleCreateArticle = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!selectedFile) return;
    try {
      const newBlob = await loadBlob(selectedFile);
      if (newBlob) {
        const imageUrl = newBlob.url;
        mutation.mutate({ title, imageUrl, body });
      } else {
        console.error('Failed to upload blob');
      }
    } catch (error) {
      console.error('Failed to create article', error);
    }
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
    <form onSubmit={handleCreateArticle}>
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
        label={"Image de l'article"}
        previewUrl={previewUrl}
        onClick={deletePreview}
        onChange={handleFileChange}
        inputRef={inputFileRef}
        required
      />
      <TextEditorField
        label="Corps de l'article"
        name="body"
        value={body}
        onChange={(value: string) => setBody(value)}
        required
      />
      <PrimaryButton type="submit" name="Créer l'article" />
    </form>
  );
}

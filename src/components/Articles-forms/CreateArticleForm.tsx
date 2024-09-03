'use client';

import '../User-forms/UserForm.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Article } from '@/interfaces/article.interface';
import { createArticle } from '@/services/articles.service';
import { useRouter } from 'next/navigation';
import { loadBlob } from '@/services/vercel-blob.service';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';
import InputField from '../Form-fields/InputField';
import ImageInputField from '../Form-fields/ImageInputField';
import Tiptap from '../Form-fields/Tiptap';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  const mutation = useMutation({
    mutationFn: async (newArticle: {
      title: Article['title'];
      imageUrl: Article['imageUrl'];
      body: Article['body'];
    }) => {
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

  const deletePreview = (): void => {
    setPreviewUrl(null);
  };

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
        label="Titre de l'article"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ImageInputField
        label={"Image de l'article"}
        previewUrl={previewUrl}
        onClick={deletePreview}
        onChange={handleFileChange}
        inputRef={inputFileRef}
        required={true}
      />
      <p>Corps de l&apos;article</p>
      <Tiptap
        value={body}
        onChange={(value: string) => setBody(value)}
        name="body"
        required
      />
      <PrimaryButton type="submit" name="Créer l'article" />
    </form>
  );
}

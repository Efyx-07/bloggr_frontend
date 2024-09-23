'use client';

import '@/styles/UserForm.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Article, Keyword } from '@/interfaces/article.interface';
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
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newKeyword, setNewKeyword] = useState<string>('');
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
      keywords: Article['keywords'];
    }) => {
      // Crée l'article avec le service article
      await createArticle(
        newArticle.title,
        newArticle.imageUrl,
        newArticle.body,
        newArticle.keywords,
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

  // Ajoute un mot-clé s'il n'est pas déjà présent dans la liste
  // ===========================================================================================
  const handleAddKeyword = () => {
    const keywordPattern = /^[^\s]+$/;
    if (
      newKeyword &&
      keywordPattern.test(newKeyword) &&
      !keywords.some((keyword) => keyword.name === newKeyword)
    ) {
      setKeywords([...keywords, { name: newKeyword }]);
      setNewKeyword('');
    } else {
      alert('Un mot clé doit être un seul mot sans espace !');
    }
  };

  // Supprime un mot-clé
  // ===========================================================================================
  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword.name !== keywordToRemove));
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
        mutation.mutate({ title, imageUrl, body, keywords });
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

  // ===========================================================================================
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
      <div className="keywords-field">
        <InputField
          id="new-keyword"
          label="Ajouter un mot-clé"
          type="text"
          name="newKeyword"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
        />
        <button type="button" onClick={handleAddKeyword}>
          Ajouter
        </button>

        <div className="keywords-list">
          {keywords.map((keyword) => (
            <div className="keyword-container" key={keyword.name}>
              <p>{keyword.name}</p>
              <button
                type="button"
                onClick={() => handleRemoveKeyword(keyword.name)}
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
      </div>
      <PrimaryButton type="submit" name="Créer l'article" />
    </form>
  );
}

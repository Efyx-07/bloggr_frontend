import '@/styles/UserForm.scss';
import { Article, Keyword } from '@/interfaces/article.interface';
import { updateArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob, loadBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import InputField from '../Form-fields/InputField';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';
import SecondaryButton from '../Sharables/Buttons/SecondaryButton';
import ImageInputField from '../Form-fields/ImageInputField';
import TextEditorField from '../Form-fields/TextEditorField';
import KeywordsField from '../Form-fields/KeywordsField';

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
  const [keywords, setKeywords] = useState<Keyword[]>(selectedArticle.keywords);
  const [newKeyword, setNewKeyword] = useState<Keyword['name']>('');
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
      await updateArticleById(
        selectedArticle.id,
        title,
        imageUrl,
        body,
        keywords,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      navToArticlesPage();
    },
    onError: (error: any) => {
      console.error('Failed to update product:', error);
    },
  });

  // Navigue vers la page Articles
  // ===========================================================================================
  const navToArticlesPage = () => {
    router.push('/articles');
  };

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
  const handleUpdateArticle = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    mutation.mutate();
  };

  // Utilise useEffect pour supprimer l'URL de la preview au démontage du composant
  // ===========================================================================================
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Utilise useEffect pour mettre à jour les données au montage du composant
  // ===========================================================================================
  useEffect(() => {
    setTitle(selectedArticle.title);
    setPreviewUrl(selectedArticle.imageUrl);
    setBody(selectedArticle.body);
    setKeywords(selectedArticle.keywords);
  }, [selectedArticle]);

  // ===========================================================================================
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
      <KeywordsField
        id="new-keyword"
        label="Ajouter un mot-clé"
        type="text"
        name="newKeyword"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        onClick={handleAddKeyword}
        keywords={keywords}
        onRemoveKeyword={handleRemoveKeyword}
      />
      <div className="buttons-container">
        <SecondaryButton
          type="reset"
          name="Annuler"
          onClick={navToArticlesPage}
        />
        <PrimaryButton type="submit" name="Mettre à jour" />
      </div>
    </form>
  );
}

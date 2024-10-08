import { Article, Keyword } from '@/interfaces/article.interface';
import { updateArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob, loadBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import InputField from '../../Form-fields/InputField';
import Button from '@/components/Sharables/Buttons/Button';
import ImageInputField from '../../Form-fields/ImageInputField';
import TextEditorField from '../../Form-fields/TextEditorField';
import KeywordsField from '../../Form-fields/KeywordsField';
import FormErrorAlert from '../../Sharables/FormErrorAlert';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
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
        if (newBlob) imageUrl = newBlob.url;
        else throw new Error('Failed to upload new image');
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
      setIsLoading(false);
      setErrorMessage(true);
      setIsClicked(false);
      console.error('Failed to update product:', error);
    },
  });

  // Navigue vers la page Articles
  // ===========================================================================================
  const navToArticlesPage = () => router.push('/dashboard/articles');

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
  const deletePreview = (): void => setPreviewUrl(null);

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
      alert(
        `Un même mot-clé ne peut être renseigné qu'une seule fois et doit être un seul mot sans espace !`,
      );
    }
  };

  // Supprime un mot-clé
  // ===========================================================================================
  const handleRemoveKeyword = (keywordToRemove: string) =>
    setKeywords(keywords.filter((keyword) => keyword.name !== keywordToRemove));

  // Réinitialise le formulaire dans son état d'origine
  // ===========================================================================================
  const handleResetForm = () => {
    setTitle(selectedArticle.title);
    setPreviewUrl(selectedArticle.imageUrl);
    setBody(selectedArticle.body);
    setKeywords(selectedArticle.keywords);
  };

  const handleResetFormAndErrorMessage = () => {
    handleResetForm();
    setErrorMessage(false);
  };

  // Soumet le formulaire pour la création de l'article
  // ===========================================================================================
  const handleUpdateArticle = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsClicked(true);
    mutation.mutate();
  };

  // Utilise useEffect pour supprimer l'URL de la preview au démontage du composant
  // ===========================================================================================
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
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
      {errorMessage ? (
        <FormErrorAlert
          errorMention="Erreur lors de la mise à jour de l'article"
          onButtonClick={handleResetFormAndErrorMessage}
          buttonMention="Rééssayer"
        />
      ) : (
        <div className="buttons-container">
          <Button
            addedClassName="button-large secondary"
            type="reset"
            name="Annuler"
            onClick={handleResetForm}
          />
          <Button
            addedClassName="button-large primary"
            type="submit"
            name="Mettre à jour"
            isLoading={isLoading}
            isClicked={isClicked}
            primary
          />
        </div>
      )}
    </form>
  );
}

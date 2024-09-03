import '../User-forms/UserForm.scss';
import { Article } from '@/interfaces/article.interface';
import { updateArticleById } from '@/services/articles.service';
import { deleteFromVercelBlob, loadBlob } from '@/services/vercel-blob.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import InputField from '../User-forms/InputField';
import Image from 'next/image';
import FileInputField from './FileInputField';
import Tiptap from './Tiptap';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';

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

      // Met à jour l'article
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

  const handleFileChange = () => {
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const deletePreview = (): void => {
    setPreviewUrl(null);
  };

  const handleUpdateArticle = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    mutation.mutate();
  };

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
        type="text"
        name="title"
        label="Titre de l'article"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="image-input-container">
        <p>Image de l&apos;article</p>
        {previewUrl ? (
          <div className="preview-container">
            <Image
              className="img"
              src={previewUrl}
              width={250}
              height={250}
              alt="Product preview"
              priority
            />
            <button
              className="remove-btn"
              type="button"
              onClick={deletePreview}
            >
              Remove
            </button>
          </div>
        ) : (
          <FileInputField
            name="imageUrl"
            id="imageUrl"
            ref={inputFileRef}
            required={true}
            onChange={handleFileChange}
          />
        )}
      </div>
      <p>Corps de l&apos;article</p>
      <Tiptap
        value={body}
        onChange={(value: string) => setBody(value)}
        name="body"
        required
      />
      <PrimaryButton type="submit" name="Modifier l'article" />
    </form>
  );
}

'use client';

import '../User-forms/UserForm.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Article } from '@/interfaces/article.interface';
import { createArticle } from '@/services/articles.service';
import { useRouter } from 'next/navigation';
import { loadBlob } from '@/services/vercel-blob.service';
import Image from 'next/image';
import FormButton from '../Sharables/FormButton';
import InputField from '../User-forms/InputField';
import FileInputField from './FileInputField';
import Tiptap from './Tiptap';

export default function CreateArticleForm() {
  const [title, setTitle] = useState<Article['title']>('');
  const [previewUrl, setPreviewUrl] = useState<Article['imageUrl'] | null>(
    null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [body, setBody] = useState<Article['body']>('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  const handleCreateArticle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) return;
    try {
      const newBlob = await loadBlob(selectedFile);
      if (newBlob) {
        const imageUrl = newBlob.url;
        await createArticle(title, imageUrl, body);
        router.push('/articles');
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
      <FormButton type="submit" name="Créer l'article" />
    </form>
  );
}

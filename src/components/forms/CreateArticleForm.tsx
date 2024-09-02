'use client';

import './Form.scss';
import { FormEvent, useState } from 'react';
import { Article } from '@/interfaces/article.interface';
import { createArticle } from '@/services/articles.service';
import { useRouter } from 'next/navigation';
import FormButton from './FormButton';
import InputField from './InputField';

export default function CreateArticleForm() {
  const [title, setTitle] = useState<Article['title']>('');
  const [imageUrl, setImageUrl] = useState<Article['imageUrl']>('');
  const [body, setBody] = useState<Article['body']>('');
  const router = useRouter();

  const handleCreateArticle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createArticle(title, imageUrl, body);
      router.push('/articles');
    } catch (error) {
      console.error('Failed to create article', error);
    }
  };
  return (
    <form onSubmit={handleCreateArticle}>
      <InputField
        name="Title"
        label="Titre de l'article"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputField
        name="Image Url"
        label="Image url de l'article"
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <InputField
        name="Body"
        label="Corps de l'article"
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <FormButton type="submit" name="Créer l'article" />
    </form>
  );
}

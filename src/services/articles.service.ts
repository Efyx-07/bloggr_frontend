import {
  Article,
  ArticleData,
  ArticleResponseData,
} from '@/interfaces/article.interface';
import { backendUrl } from '@/config';

// Crée un article, retourne les datas article en réponse
// ===========================================================================================
export async function createArticle(
  title: Article['title'],
  imageUrl: Article['imageUrl'],
  body: Article['body'],
): Promise<Article> {
  try {
    const response = await fetch(`${backendUrl}/articles/create-article`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        imageUrl,
        body,
      }),
    });
    if (response.ok) {
      const articleData: ArticleData = await response.json();
      return articleData.article;
    } else {
      throw new Error('Failed to create article: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Failed to create article: ' + error);
  }
}

// Récupère tous les articles, retourne un tableau d'article en réponse
// ===========================================================================================
export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${backendUrl}/articles`);
    if (!response.ok) {
      throw new Error('Error while fetching articles');
    }
    const data: ArticleResponseData = await response.json();
    const articles: Article[] = data.articles;
    return articles;
  } catch (error) {
    throw new Error('Error while fetching articles: ' + error);
  }
}

// Met à jour un article, retourne un message de succès
// ===========================================================================================
export async function updateArticleById(
  id: Article['id'],
  title: Article['title'],
  imageUrl: Article['imageUrl'],
  body: Article['body'],
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${backendUrl}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        imageUrl,
        body,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to update article: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Failed to update article: ' + error);
  }
}

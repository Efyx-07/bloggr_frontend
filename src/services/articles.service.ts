import { Article } from '@/interfaces/article.interface';
import { backendUrl } from '@/config';

// Crée un article, retourne les datas article en réponse
// ===========================================================================================
export async function createArticle(
  title: Article['title'],
  imageUrl: Article['imageUrl'],
  body: Article['body'],
  keywords: Article['keywords'],
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
        keywords,
      }),
    });
    if (response.ok) {
      const articleData: { article: Article } = await response.json();
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
      throw new Error('Error while fetching articles: ' + response.statusText);
    }
    const data: { articles: Article[] } = await response.json();
    const articles: Article[] = data.articles;
    return articles;
  } catch (error) {
    throw new Error('Error while fetching articles: ' + error);
  }
}

// Récupère un article par son ID, retourne l'article en réponse
// ===========================================================================================
export async function fetchArticleById(id: Article['id']): Promise<Article> {
  try {
    const response = await fetch(`${backendUrl}/articles/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error while fetching article ${id}: ` + response.statusText,
      );
    }
    const data: { article: Article } = await response.json();
    const article: Article = data.article;
    return article;
  } catch (error) {
    throw new Error(`Error while fetching article ${id}: ` + error);
  }
}

// Met à jour un article, retourne un message de succès
// ===========================================================================================
export async function updateArticleById(
  id: Article['id'],
  title: Article['title'],
  imageUrl: Article['imageUrl'],
  body: Article['body'],
  keywords: Article['keywords'],
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
        keywords,
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

// Supprime un article par son id,, retourne un message de succès
// ===========================================================================================
export async function deleteArticleById(
  id: Article['id'],
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${backendUrl}/articles/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error('Failed to delete article: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Failed to delete article: ' + error);
  }
}

// Change le statut de publication d'un article par son id,, retourne un message de succès
// ===========================================================================================
export async function updateArticlePublishedStatus(
  id: Article['id'],
  published: Article['published'],
): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${backendUrl}/articles/publish-article/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ published }),
      },
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        'Failed to update article published status: ' + response.statusText,
      );
    }
  } catch (error) {
    throw new Error('Failed to update article published status: ' + error);
  }
}

import { Article } from '@/interfaces/article.interface';
import {
  createArticle,
  deleteArticleById,
  fetchArticleById,
  fetchArticles,
  updateArticleById,
} from './articles.service';
import { backendUrl } from '@/config';

// Mock du fetch
global.fetch = jest.fn();

// Test du service de createArticle
// ===========================================================================================
describe('createArticle', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  // Teste le scénario succès
  it('should create an article successfully and return the article details', async () => {
    const mockResponse: { article: Article } = {
      article: {
        id: 1,
        title: 'Article title',
        imageUrl: 'https://article-image.com',
        body: `Corps de l'article`,
        creationDate: '01012024',
        published: false,
        publicationDate: null,
        lastUpdate: '01012024',
        keywords: [{ name: 'k1' }],
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const title: Article['title'] = 'Article title';
    const imageUrl: Article['imageUrl'] = 'https://article-image.com';
    const body: Article['body'] = `Corps de l'article`;
    const keywords: Article['keywords'] = [{ name: 'k1' }];

    const result = await createArticle(title, imageUrl, body, keywords);

    expect(fetch).toHaveBeenCalledWith(
      `${backendUrl}/articles/create-article`,
      {
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
      },
    );
    expect(result).toEqual(mockResponse.article);
  });

  // Teste le scénario echec
  it('should handle failed createArticle due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });

    const title: Article['title'] = 'Article title';
    const imageUrl: Article['imageUrl'] = 'https://article-image.com';
    const body: Article['body'] = `Corps de l'article`;
    const keywords: Article['keywords'] = [{ name: 'k1' }];

    await expect(
      createArticle(title, imageUrl, body, keywords),
    ).rejects.toThrow('Failed to create article: Server error');
  });
});

// Test du service de fetch
// ===========================================================================================
describe('fetchArticles', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  // Teste le scénario succès
  it('should fetch the articles and return an articles array', async () => {
    const mockResponse: { articles: Article[] } = {
      articles: [
        {
          id: 1,
          title: 'Article title',
          imageUrl: 'https://article-image.com',
          body: `Corps de l'article`,
          creationDate: '01012024',
          lastUpdate: '01012024',
          published: false,
          publicationDate: null,
          keywords: [{ name: 'k1' }],
        },
        {
          id: 2,
          title: 'Article title2',
          imageUrl: 'https://article-image2.com',
          body: `Corps de l'article2`,
          creationDate: '01012024',
          lastUpdate: '01012024',
          published: false,
          publicationDate: null,
          keywords: [{ name: 'k1' }],
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchArticles();

    expect(fetch).toHaveBeenCalledWith(`${backendUrl}/articles`);
    expect(result).toEqual(mockResponse.articles);
  });

  // Teste le scénario echec
  it('should handle failed fetching articles due to a server error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchArticles()).rejects.toThrow(
      'Error while fetching articles: Error: Network error',
    );
  });
});

// Test du service de fetchArticleById
// ===========================================================================================
describe('fetchArticleById', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  // Teste le scénario succès
  it('should fetch an articles by its ID and return the article', async () => {
    const mockResponse: { article: Article } = {
      article: {
        id: 1,
        title: 'Article title',
        imageUrl: 'https://article-image.com',
        body: `Corps de l'article`,
        creationDate: '01012024',
        lastUpdate: '01012024',
        published: false,
        publicationDate: null,
        keywords: [{ name: 'k1' }],
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchArticleById(1);

    expect(fetch).toHaveBeenCalledWith(`${backendUrl}/articles/1`);
    expect(result).toEqual(mockResponse.article);
  });

  // Teste le scénario echec
  it('should handle failed fetching article due to a server error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchArticleById(1)).rejects.toThrow(
      'Error while fetching article: Error: Network error',
    );
  });
});

// Test du service de updateArticleById
// ===========================================================================================
describe('updateArticleById', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  // Teste le scénario succès
  it('should update the article and return a success message', async () => {
    const articleId = 1;
    const mockResponse: { message: string } = {
      message: `Article ${articleId} successfully updated`,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const title: Article['title'] = 'Article title';
    const imageUrl: Article['imageUrl'] = 'https://article-image.com';
    const body: Article['body'] = `Corps de l'article`;
    const keywords: Article['keywords'] = [{ name: 'k1' }];

    const result = await updateArticleById(
      articleId,
      title,
      imageUrl,
      body,
      keywords,
    );

    expect(fetch).toHaveBeenCalledWith(`${backendUrl}/articles/${articleId}`, {
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
    expect(result).toEqual(mockResponse);
  });

  // Teste le scénario echec
  it('should handle failed updateArticle due to a server error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const articleId = 1;
    const title: Article['title'] = 'Article title';
    const imageUrl: Article['imageUrl'] = 'https://article-image.com';
    const body: Article['body'] = `Corps de l'article`;
    const keywords: Article['keywords'] = [{ name: 'k1' }];

    await expect(
      updateArticleById(articleId, title, imageUrl, body, keywords),
    ).rejects.toThrow('Failed to update article: Error: Network error');
  });
});

// Test du service de deleteArticleById
// ===========================================================================================
describe('deleteArticleById', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  // Teste le scénario succès
  it('should delete the article and return a success message', async () => {
    const articleId = 1;
    const mockResponse: { message: string } = {
      message: `Article ${articleId} successfully deleted`,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await deleteArticleById(articleId);

    expect(fetch).toHaveBeenCalledWith(`${backendUrl}/articles/${articleId}`, {
      method: 'DELETE',
    });
    expect(result).toEqual(mockResponse);
  });

  // Teste le scénario echec
  it('should handle failed deleteArticle due to a server error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const articleId = 1;

    await expect(deleteArticleById(articleId)).rejects.toThrow(
      'Failed to delete article: Error: Network error',
    );
  });
});

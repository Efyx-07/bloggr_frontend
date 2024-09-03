import {
  Article,
  ArticleData,
  ArticleResponseData,
} from '@/interfaces/article.interface';
import { createArticle, fetchArticles } from './articles.service';
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
    const mockResponse: ArticleData = {
      article: {
        id: 1,
        title: 'Article title',
        imageUrl: 'https://article-image.com',
        body: `Corps de l'article`,
        creationDate: '01012024',
        lastUpdate: '01012024',
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const title: Article['title'] = 'Article title';
    const imageUrl: Article['imageUrl'] = 'https://article-image.com';
    const body: Article['body'] = `Corps de l'article`;

    const result = await createArticle(title, imageUrl, body);

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

    await expect(createArticle(title, imageUrl, body)).rejects.toThrow(
      'Failed to create article: Server error',
    );
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
    const mockResponse: ArticleResponseData = {
      articles: [
        {
          id: 1,
          title: 'Article title',
          imageUrl: 'https://article-image.com',
          body: `Corps de l'article`,
          creationDate: '01012024',
          lastUpdate: '01012024',
        },
        {
          id: 2,
          title: 'Article title2',
          imageUrl: 'https://article-image2.com',
          body: `Corps de l'article2`,
          creationDate: '01012024',
          lastUpdate: '01012024',
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

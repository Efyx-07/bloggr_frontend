import { Article } from '@/interfaces/article.interface';
import { backendUrl } from '@/config';
import { createArticle, fetchArticles } from '../articles.service';

// Mock du fetch
global.fetch = jest.fn();

// Test du service createArticle
// ===========================================================================================
describe('create-article', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  const mockArticle: Article = {
    id: 1,
    title: 'title',
    imageUrl: 'https://imageurl.com',
    body: 'body',
    creationDate: new Date('2024-08-30T12:00:00Z'),
    lastUpdate: new Date('2024-08-30T12:00:00Z'),
    published: false,
    publicationDate: null,
    keywords: [{ id: 1, name: 'keyword1' }],
  };

  const title = 'title';
  const imageUrl = 'https://imageurl.com';
  const body = 'body';
  const keywords = mockArticle.keywords;

  // Teste le scénario succès
  // ===========================================================================================
  it('should create an article and return article details', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ article: mockArticle }),
    });
    const result = await createArticle(title, imageUrl, body, keywords);
    expect(fetch).toHaveBeenCalledWith(
      `${backendUrl}/articles/create-article`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, imageUrl, body, keywords }),
      },
    );
    expect(result).toEqual(mockArticle);
  });

  // Teste le scénario echec
  // ===========================================================================================
  it('should handle failed create an article due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });
    await expect(
      createArticle(title, imageUrl, body, keywords),
    ).rejects.toThrow('Failed to create article: Server error');
  });
});

// Test du service fetchArticles
// ===========================================================================================
describe('fetchArticles', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  const keywords: Article['keywords'] = [
    { id: 1, name: 'keyword1' },
    { id: 2, name: 'keyword2' },
  ];

  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Article 1',
      imageUrl: 'url1',
      body: 'body1',
      creationDate: new Date('2024-08-30T12:00:00Z'),
      lastUpdate: new Date('2024-08-30T12:00:00Z'),
      published: false,
      publicationDate: null,
      keywords: keywords,
    },
    {
      id: 2,
      title: 'Article 2',
      imageUrl: 'url2',
      body: 'body2',
      creationDate: new Date('2024-08-30T12:00:00Z'),
      lastUpdate: new Date('2024-08-30T12:00:00Z'),
      published: false,
      publicationDate: null,
      keywords: keywords,
    },
  ];

  // Teste le scénario succès
  // ===========================================================================================
  it('should get all the articles and return an array of articles', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: mockArticles }),
    });
    const result = await fetchArticles();
    expect(result).toEqual(mockArticles);
  });

  // Teste le scénario echec
  // ===========================================================================================
  it('should handle failed get articles due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });
    await expect(fetchArticles()).rejects.toThrow(
      'Error while fetching articles: Server error',
    );
  });
});

// Test du service fetchArticleById
// ===========================================================================================
describe('fetchArticleById', () => {
  // Teste le scénario succès
  // ===========================================================================================
  // Teste le scénario echec
  // ===========================================================================================
});

// Test du service updateArticleById
// ===========================================================================================
describe('updateArticleById', () => {
  // Teste le scénario succès
  // ===========================================================================================
  // Teste le scénario echec
  // ===========================================================================================
});

// Test du service deleteArticleById
// ===========================================================================================
describe('deleteArticleById', () => {
  // Teste le scénario succès
  // ===========================================================================================
  // Teste le scénario echec
  // ===========================================================================================
});

// Test du service updateArticlePublishedStatus
// ===========================================================================================
describe('updateArticlePublishedStatus', () => {
  // Teste le scénario succès
  // ===========================================================================================
  // Teste le scénario echec
  // ===========================================================================================
});

import { Article } from '@/interfaces/article.interface';
import { backendUrl } from '@/config';
import {
  createArticle,
  fetchArticleById,
  fetchArticles,
  updateArticleById,
} from '../articles.service';

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

  const title: Article['title'] = 'title';
  const imageUrl: Article['imageUrl'] = 'https://imageurl.com';
  const body: Article['body'] = 'body';
  const keywords: Article['keywords'] = mockArticle.keywords;

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
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  const keywords: Article['keywords'] = [
    { id: 1, name: 'keyword1' },
    { id: 2, name: 'keyword2' },
  ];

  const mockArticle: Article = {
    id: 1,
    title: 'Article 1',
    imageUrl: 'url1',
    body: 'body1',
    creationDate: new Date('2024-08-30T12:00:00Z'),
    lastUpdate: new Date('2024-08-30T12:00:00Z'),
    published: false,
    publicationDate: null,
    keywords: keywords,
  };

  // Teste le scénario succès
  // ===========================================================================================
  it('should get an article by its id and return the article details', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ article: mockArticle }),
    });
    const result = await fetchArticleById(mockArticle.id);
    expect(result).toEqual(mockArticle);
  });

  // Teste le scénario echec
  // ===========================================================================================
  it('should handle failed get article by its id due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });
    await expect(fetchArticleById(mockArticle.id)).rejects.toThrow(
      `Error while fetching article ${mockArticle.id}: Server error`,
    );
  });
});

// Test du service updateArticleById
// ===========================================================================================
describe('updateArticleById', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  const id: Article['id'] = 1;
  const title: Article['title'] = 'title';
  const imageUrl: Article['imageUrl'] = 'https://imageurl.com';
  const body: Article['body'] = 'body';
  const keywords: Article['keywords'] = [
    { id: 1, name: 'keyword1' },
    { id: 2, name: 'keyword2' },
  ];

  // Teste le scénario succès
  // ===========================================================================================
  it('should update an article by its id and return a success message', async () => {
    const mockSuccessMessage: string = 'Article successfully updated !';

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessMessage,
    });
    const result = await updateArticleById(id, title, imageUrl, body, keywords);
    expect(fetch).toHaveBeenCalledWith(`${backendUrl}/articles/${id}`, {
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
    expect(result).toEqual(mockSuccessMessage);
  });

  // Teste le scénario echec
  // ===========================================================================================
  it('should handle failed update an article due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });
    await expect(
      updateArticleById(id, title, imageUrl, body, keywords),
    ).rejects.toThrow('Failed to update article: Server error');
  });
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

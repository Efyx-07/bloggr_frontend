import { Article } from '@/interfaces/article.interface';
import { backendUrl } from '@/config';
import { createArticle } from '../articles.service';

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
    creationDate: 'date',
    lastUpdate: 'date',
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
    const result = await createArticle(
      title,
      imageUrl,
      body,
      keywords,
    );
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

// Test du service fetchArticleById
// ===========================================================================================

// Test du service updateArticleById
// ===========================================================================================

// Test du service deleteArticleById
// ===========================================================================================

// Test du service updateArticlePublishedStatus
// ===========================================================================================

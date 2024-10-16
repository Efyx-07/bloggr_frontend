import '@testing-library/jest-dom';
import PublishArticleButton from '../PublishArticleButton';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';
import { updateArticlePublishedStatus } from '@/services/articles.service';

// Crée une instance de QueryClient
const queryClient = new QueryClient();

// Mock des fonctions utilisées dans le composant
jest.mock('@/services/articles.service', () => ({
  updateArticlePublishedStatus: jest.fn(),
}));

// Test de PublishArticleButton
// ===========================================================================================
describe('PublishArticleButton', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  const mockSelectedArticle: Article = {
    id: 123,
    title: "Titre de l'article",
    imageUrl: 'http://example.com/image.jpg',
    body: "Contenu de l'article",
    creationDate: new Date('2024-10-15'),
    lastUpdate: new Date('2024-10-15'),
    published: false,
    publicationDate: null,
    keywords: [
      { id: 1, name: 'exemple' },
      { id: 2, name: 'test' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test de rendu: affiche le nom 'Publier' quand l'article n'est pas publié
  // ===========================================================================================
  it('should render the button and display the name in case of unpublished article', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PublishArticleButton
          selectedArticle={mockSelectedArticle}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </QueryClientProvider>,
    );

    const publishArticleButton = screen.getByRole('button', {
      name: /Publier/i,
    });
    expect(publishArticleButton).toBeInTheDocument();
    expect(publishArticleButton).toHaveTextContent('Publier');
  });

  // Test de rendu: affiche le nom 'Dépublier' quand l'article est déjà publié
  // ===========================================================================================
  it('should render the button and display the name in case of already published article', () => {
    const publishedArticle = { ...mockSelectedArticle, published: true }; // Article publié
    render(
      <QueryClientProvider client={queryClient}>
        <PublishArticleButton
          selectedArticle={publishedArticle}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </QueryClientProvider>,
    );

    const publishArticleButton = screen.getByRole('button', {
      name: /Dépublier/i,
    });
    expect(publishArticleButton).toBeInTheDocument();
    expect(publishArticleButton).toHaveTextContent('Dépublier');
  });

  // Test du bon fonctionnement du bouton: vérifie que le statut change
  // ===========================================================================================
  it('should call the mutation and toggle the publish status', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PublishArticleButton
          selectedArticle={mockSelectedArticle}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </QueryClientProvider>,
    );

    const publishArticleButton = screen.getByRole('button', {
      name: /Publier/i,
    });

    // Simule le click du bouton
    fireEvent.click(publishArticleButton);

    await waitFor(() => {
      expect(updateArticlePublishedStatus).toHaveBeenCalledWith(
        mockSelectedArticle.id,
        !mockSelectedArticle.published,
      );
    });
  });

  // Test en cas d'erreur
  // ===========================================================================================
  it('should handle publish status toggle error', async () => {
    const {
      updateArticlePublishedStatus,
    } = require('@/services/articles.service');

    // Simule une erreur
    updateArticlePublishedStatus.mockRejectedValueOnce(new Error('Error'));

    render(
      <QueryClientProvider client={queryClient}>
        <PublishArticleButton
          selectedArticle={mockSelectedArticle}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </QueryClientProvider>,
    );

    const publishArticleButton = screen.getByRole('button', {
      name: /Publier/i,
    });

    // Simule le click du bouton
    fireEvent.click(publishArticleButton);

    await waitFor(() => {
      expect(mockOnSuccess).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledTimes(1);
    });
  });
});

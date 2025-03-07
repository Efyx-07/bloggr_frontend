import '@testing-library/jest-dom';
import DeleteButton from '../DeleteButton';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Article } from '@/interfaces/article.interface';

// Crée une instance de QueryClient
const queryClient = new QueryClient();

// Mock des fonctions utilisées dans le composant
jest.mock('@/services/articles.service', () => ({
  deleteArticleById: jest.fn(),
}));

jest.mock('@/services/vercel-blob.service', () => ({
  deleteFromVercelBlob: jest.fn(),
}));

// Test de DeleteButton
// ===========================================================================================
describe('DeleteButton', () => {
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

  // Test de rendu
  // ===========================================================================================
  it('should render the button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteButton
          selectedArticle={mockSelectedArticle}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </QueryClientProvider>,
    );

    const deleteButton = screen.getByRole('button', { name: /supprimer/i });
    expect(deleteButton).toBeInTheDocument();
  });

  // Test du bon fonctionnement du bouton
  // ===========================================================================================
  it('should handle the deletion successfully', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteButton
          selectedArticle={mockSelectedArticle}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </QueryClientProvider>,
    );

    const deleteButton = screen.getByRole('button', { name: /supprimer/i });

    // Simule le click du bouton
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      expect(mockOnError).not.toHaveBeenCalled();
    });
  });

  // Test en cas d'erreur
  // ===========================================================================================
  it('should handle the deletion error', async () => {
    const { deleteArticleById } = require('@/services/articles.service');
    const { deleteFromVercelBlob } = require('@/services/vercel-blob.service');

    // Simule une erreur
    deleteFromVercelBlob.mockRejectedValueOnce(new Error('Error'));
    deleteArticleById.mockRejectedValueOnce(new Error('Error'));

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteButton
          selectedArticle={mockSelectedArticle}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </QueryClientProvider>,
    );

    const deleteButton = screen.getByRole('button', { name: /supprimer/i });

    // Simule le click du bouton
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnSuccess).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledTimes(1);
    });
  });
});

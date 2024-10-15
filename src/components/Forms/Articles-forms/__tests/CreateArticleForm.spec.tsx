import '@testing-library/jest-dom';
import CreateArticleForm from '../CreateArticleForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// Crée une instance de QueryClient
const queryClient = new QueryClient();

// Mock du service createArticle
jest.mock('@/services/articles.service', () => ({
  createArticle: jest.fn(),
}));

// Mock le router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock de la fonction loadBlob
jest.mock('@/services/vercel-blob.service', () => ({
  loadBlob: jest.fn(),
}));

// Mock de URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'http://example.com/image.png');
global.URL.revokeObjectURL = jest.fn();

// Test de CreateArticleForm
// ===========================================================================================
describe('CreateArticleForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Test de rendu
  // ===========================================================================================
  it('should render the form', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateArticleForm />
      </QueryClientProvider>,
    );
    expect(screen.getByLabelText(/Titre de l'article/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image de l'article/i)).toBeInTheDocument();

    // Cible CKEditor avec getByTestId et attend son rendu avec waitFor
    await waitFor(() =>
      expect(screen.getByTestId('ckeditor')).toBeInTheDocument(),
    );

    expect(screen.getByLabelText(/Ajouter un mot-clé/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Créer l'article/i }),
    ).toBeInTheDocument();
  });

  // Test de l'affichage d'erreur en cas d'erreur serveur
  // ===========================================================================================
  /*it('should display an error due to a server error', async () => {
    const { createArticle } = require('@/services/articles.service');
    // Simule une erreur
    createArticle.mockRejectedValueOnce(new Error('Error'));

    render(
      <QueryClientProvider client={queryClient}>
        <CreateArticleForm />
      </QueryClientProvider>,
    );

    // Mock la saisie des champs du formulaire
    fireEvent.change(screen.getByLabelText(/Titre de l'article/i), {
      target: { value: 'titre' },
    });

    // Simule l'upload d'une image avec un champ de type fichier
    const fileInput = screen.getByLabelText(/Image de l'article/i);
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(screen.getByTestId('ckeditor'), {
      target: { value: "Contenu de l'article" },
    });
    fireEvent.change(screen.getByLabelText(/Ajouter un mot-clé/i), {
      target: { value: 'keyword' },
    });

    // Mock la soumission du formulaire avec le bouton
    fireEvent.submit(screen.getByRole('button', { name: /Créer l'article/i }));

    // Affiche le message d'erreur
    await waitFor(() => {
      expect(
        screen.getByText(/Erreur lors de la création de l'article/i),
      ).toBeInTheDocument();
    });
  });*/

  // Test du bon fonctionnement du formulaire
  // ===========================================================================================
  /*it('should create the article and navigates to the articles page', async () => {
    const { createArticle } = require('@/services/articles.service');
    const { loadBlob } = require('@/services/vercel-blob.service');
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    // Simule la réponse du service loadBlob
    loadBlob.mockResolvedValueOnce({ url: 'http://example.com/image.png' });

    // Simule la réponse du service createArticle
    createArticle.mockResolvedValueOnce({});

    render(
      <QueryClientProvider client={queryClient}>
        <CreateArticleForm />
      </QueryClientProvider>,
    );

    // Remplit les champs du formulaire
    fireEvent.change(screen.getByLabelText(/Titre de l'article/i), {
      target: { value: 'title' },
    });

    // Simule l'upload d'une image
    const fileInput = screen.getByLabelText(/Image de l'article/i);
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });
    fireEvent.change(fileInput);

    // Remplit le corps de l'article
    fireEvent.change(screen.getByTestId('ckeditor'), {
      target: { value: 'body' },
    });

    // Ajoute un mot-clé
    fireEvent.change(screen.getByLabelText(/Ajouter un mot-clé/i), {
      target: { value: 'keyword' },
    });

    // Soumet le formulaire
    fireEvent.submit(screen.getByRole('button', { name: /Créer l'article/i }));

    // Vérifie que le service createArticle a été appelé avec les bons arguments
    await waitFor(() => {
      expect(createArticle).toHaveBeenCalledWith(
        'title',
        'http://example.com/image.png',
        'body',
        expect.arrayContaining([{ name: 'keyword' }]),
      );
    });

    // Vérifie la navigation vers le dashboard
    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/articles');
  });*/
});

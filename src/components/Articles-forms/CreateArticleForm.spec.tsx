import 'jest-environment-jsdom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateArticleForm from './CreateArticleForm';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loadBlob } from '@/services/vercel-blob.service';
import { createArticle } from '@/services/articles.service';

// Mocks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));
jest.mock('@/services/vercel-blob.service', () => ({
  loadBlob: jest.fn(),
}));
jest.mock('@ckeditor/ckeditor5-react', () => {
  console.log('CKEditor mock used'); // Ajoutez ceci pour déboguer
  return {
    CKEditor: ({
      onChange,
      data,
    }: {
      onChange: (event: any, editor: any) => void;
      data: string;
    }) => (
      <textarea
        data-testid="ckeditor"
        value={data}
        onChange={(e) => onChange(null, { getData: () => e.target.value })}
      />
    ),
  };
});

describe('CreateArticleForm', () => {
  const mockRouterPush = jest.fn();
  const mockMutate = jest.fn();
  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    if (typeof global.URL.createObjectURL === 'undefined') {
      Object.defineProperty(global.URL, 'createObjectURL', {
        value: jest.fn(),
      });
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test rendu composant
  // ===========================================================================================
  it('should render form fields correctly', () => {
    render(<CreateArticleForm />);
    expect(screen.getByLabelText(/Titre de l'article/i)).toBeInTheDocument();
    expect(screen.getByText(/Image de l'article/i)).toBeInTheDocument();
    expect(screen.getByText(/Corps de l'article/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Créer l'article/i }),
    ).toBeInTheDocument();
  });

  // Test scenario succès
  // ===========================================================================================
  it('soumet le formulaire avec des données valides', async () => {
    const file = new File(['image'], 'image.png', { type: 'image/png' });

    // Simule le retour de loadBlob
    (loadBlob as jest.Mock).mockResolvedValue({
      url: 'https://example.com/image.png',
    });

    render(<CreateArticleForm />);

    screen.debug();

    // Remplir le champ titre
    fireEvent.change(screen.getByLabelText(/Titre de l'article/i), {
      target: { value: 'Mon article' },
    });

    // Ajouter une image
    const imageInput = screen.getByLabelText(/Image de l'article/i);
    Object.defineProperty(imageInput, 'files', { value: [file] });
    fireEvent.change(imageInput);

    // Simuler un changement dans CKEditor
    const editor = screen.getByTestId('ckeditor');
    fireEvent.change(editor, { target: { value: "Contenu de l'article" } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /Créer l'article/i }));

    // Attendre que les assertions passent
    await waitFor(() => {
      expect(loadBlob).toHaveBeenCalledWith(file);
      expect(mockRouterPush).toHaveBeenCalledWith('/articles');
    });
  });
});

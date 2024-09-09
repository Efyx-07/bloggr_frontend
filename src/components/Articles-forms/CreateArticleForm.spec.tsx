import { fireEvent, render, screen } from '@testing-library/react';
import CreateArticleForm from './CreateArticleForm';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loadBlob } from '@/services/vercel-blob.service';

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test rendu composant
  // ===========================================================================================
  it('renders form fields correctly', () => {
    render(<CreateArticleForm />);
    expect(screen.getByLabelText(/Titre de l'article/i)).toBeInTheDocument();
    expect(screen.getByText(/Image de l'article/i)).toBeInTheDocument();
    expect(screen.getByText(/Corps de l'article/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Créer l'article/i }),
    ).toBeInTheDocument();
  });
});

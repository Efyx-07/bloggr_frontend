import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UpdateArticleForm from './UpdateArticleForm';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
global.URL.revokeObjectURL = jest.fn();

describe('UpdateArticleForm', () => {
  it('should render form fields correctly', () => {
    const mockSelectedArticle = {
      id: 1,
      title: 'Test Article',
      imageUrl: 'https://example.com/image.jpg',
      body: 'Test Body',
      creationDate: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      keywords: [{ id: 1, name: 'key1' }],
    };
    render(<UpdateArticleForm selectedArticle={mockSelectedArticle} />);
    expect(screen.getByLabelText(/Titre de l'article/i)).toBeInTheDocument();
    expect(screen.getByText(/Image de l'article/i)).toBeInTheDocument();
    expect(screen.getByText(/Corps de l'article/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Modifier l'article/i }),
    ).toBeInTheDocument();
  });
});

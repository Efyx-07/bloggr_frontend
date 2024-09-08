import '@testing-library/jest-dom';

import { jest } from '@jest/globals';

// Mock du useRouter de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

beforeAll(() => {
  // Mock `localStorage`
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: jest.fn(),
      getItem: jest
        .fn()
        .mockReturnValue(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOjEsImlhdCI6MTY0MjMwNjAwMCwiZXhwIjoxNjQyMzA5NjAwfQ.S2VhQ9rKdC-SlZZh7AThDZMY9lUncA-KJp7rNljGHAY',
        ),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

// Mock `console.error` to suppress error messages during tests
jest.spyOn(console, 'error').mockImplementation(() => {});

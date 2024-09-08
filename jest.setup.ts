import '@testing-library/jest-dom';

import { jest } from '@jest/globals';

// Mock du useRouter de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

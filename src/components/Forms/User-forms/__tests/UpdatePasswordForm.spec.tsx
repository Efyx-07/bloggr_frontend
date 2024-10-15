import '@testing-library/jest-dom';
import UpdatePasswordForm from '../UpdatePasswordForm';
import { render, screen } from '@testing-library/react';

// Mock du service de updatePassword
jest.mock('@/services/admin.service', () => ({
  updatePassword: jest.fn(),
}));

// Test de UpdatePasswordForm
// ===========================================================================================
describe('UpdatePasswordForm', () => {
  // Test de rendu
  // ===========================================================================================
  it('should render the form', () => {
    render(<UpdatePasswordForm />);
    expect(
      screen.getByLabelText(/Votre mot de passe actuel/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nouveau mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Modifier/i }),
    ).toBeInTheDocument();
  });
});

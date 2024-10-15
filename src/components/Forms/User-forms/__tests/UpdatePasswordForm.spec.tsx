import '@testing-library/jest-dom';
import UpdatePasswordForm from '../UpdatePasswordForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Mock du service de updatePassword
jest.mock('@/services/admin.service', () => ({
  updatePassword: jest.fn(),
}));

// Mock de decodeTokenAndGetAdminId
jest.mock('@/utils/decodeTokenAndGetAdminId', () => ({
  decodeTokenAndGetAdminId: jest.fn(),
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

  // Test de l'affichage d'erreur en cas d'identifiants invalides ou erreur serveur
  // ===========================================================================================
  it('should display an error if credentials are invalid or server error', async () => {
    render(<UpdatePasswordForm />);
    // Renseignement de données invalides dans les champs
    fireEvent.change(screen.getByLabelText(/Votre mot de passe actuel/i), {
      target: { value: 'invalid current password' },
    });
    fireEvent.change(screen.getByLabelText(/Nouveau mot de passe/i), {
      target: { value: 'invalid new password' },
    });
    // Mock la soumission du formulaire avec le bouton
    fireEvent.submit(screen.getByRole('button', { name: /Modifier/i }));
    // Affiche le message d'erreur
    await waitFor(() => {
      expect(
        screen.getByText(/Mot de passe invalide ou erreur serveur/i),
      ).toBeInTheDocument();
    });
  });
});

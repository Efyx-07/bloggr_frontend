import '@testing-library/jest-dom';
import UpdatePasswordForm from '../UpdatePasswordForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Mock du service de updatePassword
jest.mock('@/services/update-password.service', () => ({
  updatePassword: jest.fn(),
}));

// Mock de decodeTokenAndGetAdminId
jest.mock('@/utils/decodeTokenAndGetAdminId', () => ({
  decodeTokenAndGetAdminId: jest.fn(() => 1),
}));

// Mock de logoutAdmin
jest.mock('@/hooks/useLogoutAdmin', () => {
  const mockLogoutAdmin = jest.fn();
  return jest.fn(() => mockLogoutAdmin);
});

// Mock le localStorage
beforeEach(() => {
  jest.spyOn(Storage.prototype, 'setItem');
  localStorage.setItem('token', 'mock-token');
});

// Test de UpdatePasswordForm
// ===========================================================================================
describe('UpdatePasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
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
    const { updatePassword } = require('@/services/update-password.service');
    // Simule une erreur
    updatePassword.mockRejectedValueOnce(new Error('Error'));

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

  // Test du bon fonctionnement du formulaire
  // ===========================================================================================
  it('should update the password and logout admin', async () => {
    const { updatePassword } = require('@/services/update-password.service');
    const mockLogoutAdmin = require('@/hooks/useLogoutAdmin')();

    updatePassword.mockResolvedValueOnce();

    render(<UpdatePasswordForm />);

    // Renseignement de données valides dans les champs
    fireEvent.change(screen.getByLabelText(/Votre mot de passe actuel/i), {
      target: { value: 'validcurrentpassword' },
    });
    fireEvent.change(screen.getByLabelText(/Nouveau mot de passe/i), {
      target: { value: 'validNewPassword' },
    });
    // Mock la soumission du formulaire avec le bouton
    fireEvent.submit(screen.getByRole('button', { name: /Modifier/i }));

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith(
        'mock-token',
        1,
        'validcurrentpassword',
        'validNewPassword',
      );
      expect(mockLogoutAdmin).toHaveBeenCalled();
    });
  });
});

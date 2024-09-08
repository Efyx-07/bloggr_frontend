import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UpdatePasswordForm from './UpdatePasswordForm';
import { updatePassword } from '@/services/update-password.service';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';

jest.mock('@/services/update-password.service');
jest.mock('@/hooks/useLogoutAdmin');

describe('UpdatePasswordForm', () => {
  const mockUpdatePassword = updatePassword as jest.Mock;
  const mockLogoutAdmin = useLogoutAdmin as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with current-password and new-password fields', () => {
    render(<UpdatePasswordForm />);
    expect(
      screen.getByLabelText(/Votre mot de passe actuel/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nouveau mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Modifier/i }),
    ).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockCurrentPassword = 'currentPassword';
    const mockNewPassword = 'newPassword';

    // Mock implementations
    mockUpdatePassword.mockResolvedValueOnce({});
    mockLogoutAdmin.mockImplementation(() => {});

    render(<UpdatePasswordForm />);

    // Simuler l'entrée de l'utilisateur
    fireEvent.change(screen.getByLabelText(/Votre mot de passe actuel/i), {
      target: { value: mockCurrentPassword },
    });
    fireEvent.change(screen.getByLabelText(/Nouveau mot de passe/i), {
      target: { value: mockNewPassword },
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));

    // Vérifiez que l'appel à `updatePassword` a été effectué avec les bons arguments
    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOjEsImlhdCI6MTY0MjMwNjAwMCwiZXhwIjoxNjQyMzA5NjAwfQ.S2VhQ9rKdC-SlZZh7AThDZMY9lUncA-KJp7rNljGHAY', // Token simulé
        expect.any(Number), // ID admin décodé du token
        mockCurrentPassword,
        mockNewPassword,
      );
      expect(mockLogoutAdmin).toHaveBeenCalled();
    });
  });
});

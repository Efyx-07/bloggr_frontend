import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UpdatePasswordForm from './UpdatePasswordForm';
import { updatePassword } from '@/services/update-password.service';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';
import { decodeTokenAndGetAdminId } from '@/utils/decodeTokenAndGetAdminId';

jest.mock('@/services/update-password.service');
jest.mock('@/utils/decodeTokenAndGetAdminId');
jest.mock('@/hooks/useLogoutAdmin');

describe('UpdatePasswordForm', () => {
  const mockUpdatePassword = updatePassword as jest.Mock;
  const mockLogoutAdmin = useLogoutAdmin as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders form with current-password and new-password fields', () => {
    render(<UpdatePasswordForm />);
    expect(
      screen.getByLabelText(/Votre mot de passe actuel/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nouveau mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Modifier/i }),
    ).toBeInTheDocument();
  });

  it('shouldhandles form submission successfully', async () => {
    const mockCurrentPassword = 'currentPassword';
    const mockNewPassword = 'newPassword';
    const mockToken = 'mock-token';
    const mockAdminId = 1;

    localStorage.setItem('token', mockToken);
    (decodeTokenAndGetAdminId as unknown as jest.Mock).mockReturnValue(
      mockAdminId,
    );
    (useLogoutAdmin as jest.Mock).mockReturnValue(mockLogoutAdmin);
    (updatePassword as jest.Mock).mockResolvedValue(undefined);

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

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith(
        mockToken,
        mockAdminId,
        mockCurrentPassword,
        mockNewPassword,
      );
      expect(mockLogoutAdmin).toHaveBeenCalled();
    });
  });
});

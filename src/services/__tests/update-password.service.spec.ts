import { Admin, AdminResponse } from '@/interfaces/admin.interface';
import { updatePassword } from '../update-password.service';
import { backendUrl } from '@/config';

// Mock du fetch
global.fetch = jest.fn();

// Test du service update-password
// ===========================================================================================
describe('update-password', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  const token: AdminResponse['token'] = 'mockToken';
  const adminId: Admin['id'] = 1;
  const currentPassword: Admin['password'] = 'currentPassword';
  const newPassword: Admin['password'] = 'newPassword';

  // Teste le scénario succès
  // ===========================================================================================
  it('should succesfully update password and return a success message', async () => {
    const mockSuccessMessage: AdminResponse['message'] =
      'Password successfully updated !';

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: mockSuccessMessage }),
    });

    const result = await updatePassword(
      token,
      adminId,
      currentPassword,
      newPassword,
    );

    expect(fetch).toHaveBeenCalledWith(
      `${backendUrl}/passwords/update-password`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adminId,
          currentPassword,
          newPassword,
        }),
      },
    );
    expect(result).toEqual(mockSuccessMessage);
  });

  // Teste le scénario echec
  // ===========================================================================================
  it('should failed update-password due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });

    await expect(
      updatePassword(token, adminId, currentPassword, newPassword),
    ).rejects.toThrow('Error while updating password: Server error');
  });
});

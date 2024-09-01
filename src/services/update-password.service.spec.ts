import { Admin } from '@/interfaces/admin.interface';
import { updatePassword } from './update-password.service';
import { backendUrl } from '@/config';

// Mock du fetch
global.fetch = jest.fn();

// Test du service updatePassword
// ===========================================================================================
describe('update-password', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  // Teste le scénario succès
  it('should successfully update the admin password and return a success message', async () => {
    const mockResponse = { message: 'password successfully updated' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const token: Admin['token'] = 'mockToken';
    const adminId: Admin['id'] = 1;
    const currentPassword: Admin['password'] = 'password123';
    const newPassword: Admin['password'] = 'newPassword123';

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
    expect(result).toEqual(mockResponse.message);
  });

  // Teste le scénario succès
  it('should handle failed update-password due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });

    const token: Admin['token'] = 'mockToken';
    const adminId: Admin['id'] = 1;
    const currentPassword: Admin['password'] = 'password123';
    const newPassword: Admin['password'] = 'newPassword123';

    await expect(
      updatePassword(token, adminId, currentPassword, newPassword),
    ).rejects.toThrow('Error while updating password: Server error');
  });
});

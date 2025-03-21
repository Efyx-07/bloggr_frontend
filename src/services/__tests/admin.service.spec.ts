import { Admin, AdminResponse } from '@/interfaces/admin.interface';
import { login } from '../admin.service';
import { backendUrl } from '@/config';

// Mock du fetch
global.fetch = jest.fn();

// Test du service de login
// ===========================================================================================
describe('login', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks après chaque test
  });

  // Teste le scénario succès
  // ===========================================================================================
  it('should successfully login the admin and return data', async () => {
    const mockResponse: AdminResponse = {
      admin: {
        id: 1,
        email: 'admin@admin.com',
        firstName: 'first',
        lastName: 'last',
      },
      success: true,
      message: 'successfully logged',
      token: 'token',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const email: Admin['email'] = 'admin@admin.com';
    const password: Admin['password'] = 'password123';

    const result = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(`${backendUrl}/admins/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    expect(result).toEqual(mockResponse);
  });

  // Teste le scénario echec
  // ===========================================================================================
  it('should handle failed login due to a server error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server error',
    });

    const email: Admin['email'] = 'admin@admin.com';
    const password: Admin['password'] = 'password123';

    await expect(login(email, password)).rejects.toThrow(
      'Error while connecting: Server error',
    );
  });
});

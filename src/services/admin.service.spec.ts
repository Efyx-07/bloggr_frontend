import { Admin, AdminData } from '@/interfaces/admin.interface';
import { login } from './admin.service';

// Mock du fetch
global.fetch = jest.fn();

describe('login', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Reset the mock after each test
  });

  it('should successfully login the admin and return data', async () => {
    const mockResponse: AdminData = {
      success: true,
      message: 'successfully logged',
      token: 'token',
      admin: {
        id: 1,
        email: 'admin@admin.com',
        firstName: 'first',
        lastName: 'last',
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const email: Admin['email'] = 'admin@admin.com';
    const password: Admin['password'] = 'password123';

    const result = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admins/login`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );
    expect(result).toEqual(mockResponse);
  });
});

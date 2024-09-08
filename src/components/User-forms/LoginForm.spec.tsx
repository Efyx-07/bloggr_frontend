import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { login } from '@/services/admin.service';
import useAdminStore from '@/stores/adminStore';
import { useRouter } from 'next/navigation';

// Mocks
jest.mock('@/services/admin.service');
jest.mock('@/stores/adminStore');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm', () => {
  const mockSetAdminData = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useAdminStore as unknown as jest.Mock).mockReturnValue({
      setAdminData: mockSetAdminData,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the form with email and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Votre email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Me connecter/i }),
    ).toBeInTheDocument();
  });

  it('should handle form submission succesfully', async () => {
    const mockAdminData = {
      email: 'admin@example.com',
      token: 'admin-token',
    };

    (login as jest.Mock).mockResolvedValue(mockAdminData);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Votre email/i), {
      target: { value: 'admin@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Votre mot de passe/i), {
      target: { value: 'password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Me connecter/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('admin@example.com', 'password123!');
      expect(mockSetAdminData).toHaveBeenCalledWith(mockAdminData);
      expect(mockPush).toHaveBeenCalledWith('/articles');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'admin-token');
    });
  });

  it('should display an error if login fails', async () => {
    (login as jest.Mock).mockRejectedValue(new Error('Login failed'));

    render(<LoginForm />);

    // Simulate form input
    fireEvent.change(screen.getByLabelText(/Votre email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Votre mot de passe/i), {
      target: { value: 'wrongpassword' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Me connecter/i }));

    // Wait for async actions
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
      expect(mockSetAdminData).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});

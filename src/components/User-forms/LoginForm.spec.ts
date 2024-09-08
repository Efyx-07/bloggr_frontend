import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import useAdminStore from '@/stores/adminStore';
import { useRouter } from 'next/navigation';
import { login } from '@/services/admin.service';
import validateLoginData from '@/utils/validateLoginData';

jest.mock('@/stores/adminStore');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/utils/validateLoginData');
jest.mock('@/services/admin.service');

describe('LoginForm', () => {
  beforeEach(() => {
    (useAdminStore as unknown as jest.Mock).mockReturnValue({
      login: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('rend le formulaire correctement', () => {
    render(LoginForm());
    expect(screen.getByLabelText('Votre email')).toBeInTheDocument();
    expect(screen.getByLabelText('Votre mot de passe')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Me connecter' }),
    ).toBeInTheDocument();
  });

  it('updates email and password state on input change', () => {
    render(LoginForm());
    const emailInput = screen.getByLabelText('Votre email');
    const passwordInput = screen.getByLabelText('Votre mot de passe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('appelle validateLoginData et retourne si la validation échoue', async () => {
    (validateLoginData as jest.Mock).mockResolvedValue(false);
    render(LoginForm());

    const formulaire = screen.getByRole('form');
    fireEvent.submit(formulaire);

    await waitFor(() => {
      expect(validateLoginData).toHaveBeenCalled();
      expect(login).not.toHaveBeenCalled();
    });
  });

  it('se connecte avec succès et redirige', async () => {
    (validateLoginData as jest.Mock).mockReturnValue(true);
    (login as jest.Mock).mockResolvedValue({ token: 'fake-token' });

    render(LoginForm());

    const emailInput = screen.getByLabelText('Votre email');
    const passwordInput = screen.getByLabelText('Votre mot de passe');
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
      expect(useRouter().push).toHaveBeenCalledWith('/articles');
    });

    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('handles login error', async () => {
    (validateLoginData as jest.Mock).mockReturnValue(true);
    (login as jest.Mock).mockRejectedValue(new Error('Login failed'));
    console.error = jest.fn();

    render(LoginForm());

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error while connecting: ',
        expect.any(Error),
      );
    });
  });
});

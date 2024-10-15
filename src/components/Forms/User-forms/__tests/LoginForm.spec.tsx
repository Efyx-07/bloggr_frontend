import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Mock du service de login
jest.mock('@/services/admin.service', () => ({
  login: jest.fn(),
}));

// Mock le router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock le store
const mockSetAdminData = jest.fn();
jest.mock('@/stores/adminStore', () => ({
  __esModule: true,
  default: () => ({
    setAdminData: mockSetAdminData,
  }),
}));

// Mock la validation des datas
jest.mock('@/utils/validateLoginData', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true), // Mock la validation pour qu'elle passe
}));

// Mock le localStorage
beforeEach(() => {
  jest.spyOn(Storage.prototype, 'setItem');
});

// Test de LoginForm
// ===========================================================================================
describe('LoginForm', () => {
    
  // Test de rendu
  // ===========================================================================================
  it('should render the form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Votre email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Me connecter/i }),
    ).toBeInTheDocument();
  });

  // Test de l'affichage d'erreur en cas d'identifiants invalides
  // ===========================================================================================
  it('should display an error when invalid credentials are provided', async () => {
    render(<LoginForm />);
    // Renseignement de données invalides dans les champs
    fireEvent.change(screen.getByLabelText(/Votre email/i), {
      target: { value: 'invalid email' },
    });
    fireEvent.change(screen.getByLabelText(/Votre mot de passe/i), {
      target: { value: 'invalid password' },
    });
    // Mock la soumission du formulaire avec le bouton
    fireEvent.submit(screen.getByRole('button', { name: /Me connecter/i }));
    // Affiche le message d'erreur
    await waitFor(() => {
      expect(screen.getByText(/Identifiants invalides/i)).toBeInTheDocument();
    });
  });

  // Test du bon fonctionnement du formulaire
  // ===========================================================================================
  it('should login the user with valid credentials, update store,  and navigates to the dashboard', async () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    const { login } = require('@/services/admin.service');
    login.mockResolvedValue({
      token: 'mockToken',
      email: 'admin@email.com',
    });

    render(<LoginForm />);

    // Renseignement de données valides dans les champs
    fireEvent.change(screen.getByLabelText(/Votre email/i), {
      target: { value: 'admin@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/Votre mot de passe/i), {
      target: { value: 'validpassword' },
    });
    // Mock la soumission du formulaire avec le bouton
    fireEvent.submit(screen.getByRole('button', { name: /Me connecter/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('admin@email.com', 'validpassword');
      // Vérifie que le token est stocké dans localStorage
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
      // Vérifie que le store a été mis à jour avec les données de l'admin
      expect(mockSetAdminData).toHaveBeenCalledWith({
        token: 'mockToken',
        email: 'admin@email.com',
      });
      // Vérifie la navigation vers le dashboard
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/articles');
    });
  });
});

import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders the form with email and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Votre email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Me connecter/i }),
    ).toBeInTheDocument();
  });
});

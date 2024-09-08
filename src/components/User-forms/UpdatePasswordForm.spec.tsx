import { render, screen } from '@testing-library/react';
import UpdatePasswordForm from './UpdatePasswordForm';

describe('UpdatePasswordForm', () => {
  it('renders form with current-password and new-password fields', () => {
    render(<UpdatePasswordForm />);
    expect(
      screen.getByLabelText(/Votre mot de passe actuel/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nouveau mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Modifie/i }),
    ).toBeInTheDocument();
  });
});

import validateLoginData from '../validateLoginData';
import { Admin } from '@/interfaces/admin.interface';

// Test de la fonction utilitaire validateLoginData
// ===========================================================================================
describe('validateLoginData', () => {
  const mockGoodEmail: Admin['email'] = 'example@test.com';
  const mockGoodPassword: Admin['password'] = 'Password1234!';
  const mockWrongEmail: Admin['email'] = 'invalid-email.com';
  const mockWrongPassword: Admin['password'] = 'invalid-password';

  // Test avec données valides
  it('should return true for valid email and password', async () => {
    const validEmail: Admin['email'] = mockGoodEmail;
    const validPassword: Admin['password'] = mockGoodPassword;
    const isValid: boolean = await validateLoginData(validEmail, validPassword);
    expect(isValid).toBe(true);
  });

  // Test avec email invalide
  it('should return false for invalid email', async () => {
    const invalidEmail: Admin['email'] = mockWrongEmail;
    const validPassword: Admin['password'] = mockGoodPassword;
    const isValid: boolean = await validateLoginData(
      invalidEmail,
      validPassword,
    );
    expect(isValid).toBe(false);
  });

  // Test avec password invalide
  it('should return true for invalidpassword', async () => {
    const validEmail: Admin['email'] = mockGoodEmail;
    const invalidPassword: Admin['password'] = mockWrongPassword;
    const isValid: boolean = await validateLoginData(
      validEmail,
      invalidPassword,
    );
    expect(isValid).toBe(false);
  });

  // Test avec email et password invalides
  it('should return true for invalid email and invalid password', async () => {
    const invalidEmail: Admin['email'] = mockWrongEmail;
    const invalidPassword: Admin['password'] = mockWrongPassword;
    const isValid: boolean = await validateLoginData(
      invalidEmail,
      invalidPassword,
    );
    expect(isValid).toBe(false);
  });
});

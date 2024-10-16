import validateLoginData from '../validateLoginData';

// Test de la fonction utilitaire validateLoginData
// ===========================================================================================
describe('validateLoginData', () => {
  // Test avec données valides
  it('should return true for valid email and password', async () => {
    const validEmail = 'example@test.com';
    const validPassword = 'Password1234!';
    const isValid = await validateLoginData(validEmail, validPassword);
    expect(isValid).toBe(true);
  });

  // Test avec email invalide
  it('should return false for invalid email', async () => {
    const invalidEmail = 'invalid-email.com';
    const validPassword = 'Password1234!';
    const isValid = await validateLoginData(invalidEmail, validPassword);
    expect(isValid).toBe(false);
  });

  // Test avec password invalide
  it('should return true for invalidpassword', async () => {
    const validEmail = 'example@test.com';
    const invalidPassword = 'invalid-password';
    const isValid = await validateLoginData(validEmail, invalidPassword);
    expect(isValid).toBe(false);
  });

  // Test avec email et password invalides
  it('should return true for invalid email and invalid password', async () => {
    const invalidEmail = 'invalid-email.com';
    const invalidPassword = 'invalid-password';
    const isValid = await validateLoginData(invalidEmail, invalidPassword);
    expect(isValid).toBe(false);
  });
});

import { decodeTokenAndGetAdminId } from '../decodeTokenAndGetAdminId';
import { Admin, AdminResponse } from '@/interfaces/admin.interface';

// Test de la fonction utilitaire decodeTokenAndGetAdminId
// ===========================================================================================
describe('decodeTokenAndGetAdminId', () => {
  const mockAdminId: Admin['id'] = 1;
  const mockValidToken: AdminResponse['token'] =
    'header.' + btoa(JSON.stringify({ adminId: mockAdminId })) + '.signature';
  // Mock d'un token sans signature
  const mockInvalidToken: AdminResponse['token'] = 'header.payload';

  // Test avec token valide
  it('should return adminId from a valid token', () => {
    const result = decodeTokenAndGetAdminId(mockValidToken);
    expect(result).toBe(mockAdminId);
  });

  // Test avec token invalide
  it('should return an error if invalid token', () => {
    expect(() => decodeTokenAndGetAdminId(mockInvalidToken)).toThrow(
      SyntaxError,
    );
  });
});

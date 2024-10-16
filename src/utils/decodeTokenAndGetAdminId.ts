import { Admin } from '@/interfaces/admin.interface';

// Décode le token et récupère adminId
// ===========================================================================================
export function decodeTokenAndGetAdminId(token: string) {
  const tokenParts: string[] = token.split('.');
  const tokenPayload = JSON.parse(atob(tokenParts[1]));
  const adminId: Admin['id'] = tokenPayload.adminId;
  return adminId;
}

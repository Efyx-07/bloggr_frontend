import { Admin, AdminResponse } from '@/interfaces/admin.interface';
import { backendUrl } from '@/config';

// Met à jour le mot de passe Admin et retourne un message de succès
// ===========================================================================================
export async function updatePassword(
  token: AdminResponse['token'],
  adminId: Admin['id'],
  currentPassword: Admin['password'],
  newPassword: Admin['password'],
): Promise<AdminResponse['message']> {
  try {
    const response = await fetch(`${backendUrl}/passwords/update-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        adminId,
        currentPassword,
        newPassword,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.message;
    } else {
      throw new Error('Error while updating password: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error while updating password: ' + error);
  }
}

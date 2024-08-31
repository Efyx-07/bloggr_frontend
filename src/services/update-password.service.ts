import { Admin } from '@/interfaces/admin.interface';

const backendUrl: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function updatePassword(
  token: Admin['token'],
  adminId: Admin['id'],
  currentPassword: Admin['password'],
  newPassword: Admin['password'],
): Promise<Admin['message']> {
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
    throw new Error('Error while connecting: ' + error);
  }
}

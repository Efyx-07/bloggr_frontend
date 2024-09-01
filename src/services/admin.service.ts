import { Admin } from '@/interfaces/admin.interface';
import { backendUrl } from '@/config';

// Connecte l'Admin avec son email et son mot de passe, retourne les datas admin en réponse
// ===========================================================================================
export async function login(
  email: Admin['email'],
  password: Admin['password'],
): Promise<Admin> {
  try {
    const response: Response = await fetch(`${backendUrl}/admins/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      const adminData: Admin = await response.json();
      return adminData;
    } else {
      throw new Error('Error while connecting: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error while connecting: ' + error);
  }
}

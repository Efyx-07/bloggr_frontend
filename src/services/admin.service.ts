import { Admin, AdminData } from '@/interfaces/admin.interface';

const backendUrl: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

// Connecte l'Admin avec son email et son mot de passe, retourne les datas admin en réponse
// ===========================================================================================
export async function login(
  email: Admin['email'],
  password: Admin['password'],
): Promise<AdminData> {
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
      const adminData: AdminData = await response.json();
      return adminData;
    } else {
      throw new Error('Error while connecting: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error while connecting: ' + error);
  }
}

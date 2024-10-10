'use client';

import useAdminStore from '@/stores/adminStore';
import { useEffect } from 'react';
import { Admin, AdminResponse } from '@/interfaces/admin.interface';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { useRouter } from 'next/navigation';

// Wrapper pour initialiser l'app avec les méthodes données
// ===========================================================================================
export function AppInitializer({ children }: { children: React.ReactNode }) {
  const { setAdminData, logoutAdmin } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    const token: AdminResponse['token'] = loadDataFromLocalStorage(setAdminData);
    checkTokenValidity(token, logoutAdmin, router);
  }, [setAdminData, logoutAdmin, router]);
  
  return <>{children}</>;
}

// Récupère les données du local storage (admin et token) et met à jour la méthode du store
// ===========================================================================================
function loadDataFromLocalStorage(
  setAdminData: (data: { admin: Admin; token: AdminResponse['token'] }) => void,
): string | null {
  const storedAdmin: string | null = localStorage.getItem('admin');
  const storedToken: string | null = localStorage.getItem('token');
  if (storedAdmin && storedToken) {
    try {
      const parsedAdmin: Admin = JSON.parse(storedAdmin);
      setAdminData({ admin: parsedAdmin, token: storedToken });
      return storedToken;
    } catch (error) {
      console.error('Erreur lors de la récupération des données admin:', error);
    }
  }
  return null;
}

// Vérifie la validité du token
// Déconnecte l'utilsateur et le redirige vers la page de connexion si le token est invalide
// ===========================================================================================
function checkTokenValidity(
  token: AdminResponse['token'] | null,
  logoutAdmin: () => void,
  router: any,
): void {
  if (!token || isTokenExpired(token)){
    logoutAdmin();
    router.push('/');
  }
}

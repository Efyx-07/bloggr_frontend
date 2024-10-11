'use client';

import useAdminStore from '@/stores/adminStore';
import { useEffect } from 'react';
import { Admin, AdminResponse } from '@/interfaces/admin.interface';

// Wrapper pour initialiser l'app avec les méthodes données
// ===========================================================================================
export function AppInitializer({ children }: { children: React.ReactNode }) {
  const { setAdminData } = useAdminStore();

  useEffect(() => {
    loadLocalStorageDataAndUpdateStore(setAdminData);
  }, [setAdminData]);

  return <>{children}</>;
}

// Récupère les données du local storage (admin et token) et met à jour la méthode du store
// ===========================================================================================
function loadLocalStorageDataAndUpdateStore(
  setAdminData: (data: { admin: Admin; token: AdminResponse['token'] }) => void,
): void {
  const storedAdmin: string | null = localStorage.getItem('admin');
  const storedToken: string | null = localStorage.getItem('token');
  if (storedAdmin && storedToken) {
    try {
      const parsedAdmin: Admin = JSON.parse(storedAdmin);
      setAdminData({ admin: parsedAdmin, token: storedToken });
    } catch (error) {
      console.error('Erreur lors de la récupération des données admin:', error);
    }
  }
}

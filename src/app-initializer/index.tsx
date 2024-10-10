'use client';

import useAdminStore from '@/stores/adminStore';
import { useEffect } from 'react';

// Wrapper pour initialiser l'app avec les méthodes données
// ===========================================================================================
export function AppInitializer({ children }: { children: React.ReactNode }) {
  const { setAdminData } = useAdminStore();
  useEffect(() => loadDataFromLocalStorage(setAdminData), []);
  return <>{children}</>;
}

// Récupère les données du local storage (admin et token) et met à jour la méthode du store
// ===========================================================================================
function loadDataFromLocalStorage(
  setAdminData: (data: { admin: any; token: string }) => void,
) {
  const storedAdmin = localStorage.getItem('admin');
  const storedToken = localStorage.getItem('token');
  if (storedAdmin && storedToken) {
    try {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdminData({ admin: parsedAdmin, token: storedToken });
    } catch (error) {
      console.error('Erreur lors de la récupération des données admin:', error);
    }
  }
}

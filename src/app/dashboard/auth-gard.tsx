'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';

export default function LoggedOutAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogged, checkIsLoggedStatus } = useAdminStore();
  const router = useRouter();
  const isLoggedFromLocalStorage = checkIsLoggedStatus();

  useEffect(() => {
    if (!isLoggedFromLocalStorage) {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
      router.replace('/');
    }
  }, [isLogged, isLoggedFromLocalStorage, router]);

  // Tant que l'utilisateur n'est pas identifié, ne rien rendre
  if (!isLoggedFromLocalStorage) {
    return null;
  }

  // Sinon, rend le contenu protégé
  return <>{children}</>;
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';

export default function LoggedOutAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkIsLoggedStatus } = useAdminStore();
  const [isCheckingLogin, setIsCheckingLogin] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedFromLocalStorage = checkIsLoggedStatus();
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    if (!isLoggedFromLocalStorage) {
      router.replace('/');
    } else {
      setIsCheckingLogin(false);
    }
  }, [checkIsLoggedStatus, router]);

  // Tant que l'utilisateur n'est pas identifié, ne rien rendre
  if (isCheckingLogin) return null;

  // Sinon, rend le contenu protégé
  return <>{children}</>;
}

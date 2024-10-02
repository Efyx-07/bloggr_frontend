'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/LoadingPage';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectPath: string;
  shouldBeLoggedIn: boolean;
}

// Auth-guard, protège les pages selon le statut de connexion de l'utilisateur
// Vérifie la présence d'un token dans le local storage et traite la redirection selon les cas
// ===========================================================================================
export function AuthGuard({
  children,
  redirectPath,
  shouldBeLoggedIn,
}: AuthGuardProps) {
  const [isCheckingLogin, setIsCheckingLogin] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedFromLocalStorage: boolean =
      checkTokenPresenceInLocalStorage();
    if (shouldBeLoggedIn && !isLoggedFromLocalStorage)
      router.replace(redirectPath);
    else if (!shouldBeLoggedIn && isLoggedFromLocalStorage)
      router.replace(redirectPath);
    else setIsCheckingLogin(false);
  }, [shouldBeLoggedIn, redirectPath, router]);

  if (isCheckingLogin) return <LoadingPage mention="Chargement..." />;
  return <>{children}</>;
}

// Vérifie la présence d'un token dans le local-storage
// ================================================================================================
function checkTokenPresenceInLocalStorage(): boolean {
  const token: string | null = localStorage.getItem('token');
  return !!token;
}

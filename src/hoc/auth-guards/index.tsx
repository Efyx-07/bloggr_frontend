'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/LoadingPage';
import { checkTokenPresenceAndValidity } from '../checkTokenPresenceAndValidity';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectPath: string;
  shouldBeLoggedIn: boolean;
}

// Auth-guard, protège les pages selon le statut de connexion de l'utilisateur
// Vérifie la présence et la validité d'un token dans le local storage et traite la redirection selon les cas
// Wrappe le layout des pages du dashboard et la page de connexion en passant des props
// ===========================================================================================
export function AuthGuard({
  children,
  redirectPath,
  shouldBeLoggedIn,
}: AuthGuardProps) {
  const [isCheckingLogin, setIsCheckingLogin] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedFromLocalStorage: boolean = checkTokenPresenceAndValidity();
    if (shouldBeLoggedIn && !isLoggedFromLocalStorage)
      router.replace(redirectPath);
    else if (!shouldBeLoggedIn && isLoggedFromLocalStorage)
      router.replace(redirectPath);
    else setIsCheckingLogin(false);
  }, [shouldBeLoggedIn, redirectPath, router]);

  if (isCheckingLogin) return <LoadingPage mention="Chargement..." />;
  return <>{children}</>;
}

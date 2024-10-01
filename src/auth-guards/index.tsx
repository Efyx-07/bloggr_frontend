'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';
import LoadingPage from '@/components/LoadingPage';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectPath: string;
  shouldBeLoggedIn: boolean;
}

// Auth-guard, protège les pages selon le statut de connexion de l'utilisateur
// Vérifie la présence d'un token dans le local storage et traite la redirection selon les cas
// ===========================================================================================
function AuthGuard({
  children,
  redirectPath,
  shouldBeLoggedIn,
}: AuthGuardProps) {
  const { checkIsLoggedStatus } = useAdminStore();
  const [isCheckingLogin, setIsCheckingLogin] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedFromLocalStorage = checkIsLoggedStatus();
    if (shouldBeLoggedIn && !isLoggedFromLocalStorage) {
      router.replace(redirectPath);
    } else if (!shouldBeLoggedIn && isLoggedFromLocalStorage) {
      router.replace(redirectPath);
    } else {
      setIsCheckingLogin(false);
    }
  }, [checkIsLoggedStatus, shouldBeLoggedIn, redirectPath, router]);

  if (isCheckingLogin) return <LoadingPage mention="Chargement..." />;
  return <>{children}</>;
}

// Utilisateur non connecté, empêche l'accès aux pages du dashboard et redirige vers la page de connexion
// ======================================================================================================
export function LoggedOutAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard redirectPath="/" shouldBeLoggedIn={true}>
      {children}
    </AuthGuard>
  );
}

// Utilisateur connecté, empêche un retour à la page de connexion et redirige vers la page articles
// ================================================================================================
export function LoggedInAuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard redirectPath="/dashboard/articles" shouldBeLoggedIn={false}>
      {children}
    </AuthGuard>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      // Si l'utilisateur n'est pas connecté, redirection immédiate
      router.replace('/');
    }
  }, [isLogged, router]);

  // Tant que l'utilisateur n'est pas identifié, ne rien rendre
  if (!isLogged) {
    return null; // Bloque le rendu de la page jusqu'à la redirection
  }

  // Sinon, rendre le contenu protégé
  return <>{children}</>;
}

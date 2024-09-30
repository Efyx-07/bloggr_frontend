'use client';

import '../styles/page.scss';
import LoginForm from '@/components/User-forms/LoginForm';
import FormContainer from '@/components/FormContainer';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';

export default function LoginPage() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState<boolean>(true);
  const { checkIsLoggedStatus } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    // Ne s'exécute qu'une fois côté client
    const isLoggedFromLocalStorage = checkIsLoggedStatus();
    if (isLoggedFromLocalStorage) {
      // Si l'utilisateur est connecté, redirige vers la page articles
      router.replace('/dashboard/articles');
    } else {
      // Si non connecté, rend la page de login
      setIsCheckingLogin(false);
    }

    // Affiche le contenu après un délai
    setTimeout(() => {
      setIsContentVisible(true);
    }, loadingPageDelay);
  }, [checkIsLoggedStatus, router]);

  // Tant que la vérification de connexion est en cours, ne rien rendre
  if (isCheckingLogin) return <LoadingPage mention="Chargement..." />;

  return (
    <>
      {isContentVisible ? (
        <div className="page">
          <div className="content">
            <FormContainer title="Connexion">
              <LoginForm />
            </FormContainer>
          </div>
        </div>
      ) : (
        <LoadingPage mention="Accès à la page d'accueil..." />
      )}
    </>
  );
}

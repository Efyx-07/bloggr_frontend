'use client';

import LoginForm from '@/components/Forms/User-forms/LoginForm';
import FormContainer from '@/components/Forms/FormContainer';
import LoadingPage from '@/components/LoadingPage';
import usePageLoader from '@/hooks/usePageLoader';
import { AuthGuard } from '@/hoc/auth-guards';

export default function LoginPage() {
  // Utilise le hook pour le chargement de la page
  // ===========================================================================================
  const isContentVisible = usePageLoader();
  // ===========================================================================================

  return (
    <>
      <AuthGuard redirectPath="/dashboard/articles" shouldBeLoggedIn={false}>
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
      </AuthGuard>
    </>
  );
}

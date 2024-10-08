'use client';

import LoginForm from '@/components/Forms/User-forms/LoginForm';
import FormContainer from '@/components/Forms/FormContainer';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';
import { AuthGuard } from '@/auth-guards';

export default function LoginPage() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  setTimeout(() => {
    setIsContentVisible(true);
  }, loadingPageDelay);

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

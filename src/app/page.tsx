'use client';

import '../styles/page.scss';
import LoginForm from '@/components/User-forms/LoginForm';
import FormContainer from '@/components/FormContainer';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';

export default function LoginPage() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  setTimeout(() => {
    setIsContentVisible(true);
  }, loadingPageDelay);

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

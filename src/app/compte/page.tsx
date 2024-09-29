'use client';

import '../../styles/page.scss';
import UpdatePasswordForm from '@/components/User-forms/UpdatePasswordForm';
import FormContainer from '@/components/FormContainer';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';

export default function AccountSettings() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  setTimeout(() => {
    setIsContentVisible(true);
  }, loadingPageDelay);

  return (
    <>
      {isContentVisible ? (
        <div className="page">
          <div className="content">
            <FormContainer title="Modifier votre mot de passe">
              <UpdatePasswordForm />
            </FormContainer>
          </div>
        </div>
      ) : (
        <LoadingPage mention="Accès aux paramètres du compte..." />
      )}
    </>
  );
}

'use client';

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
            <FormContainer
              title="Modifier votre mot de passe"
              additionalMention="Note: à la modification du mot de passe, vous serez redirigé vers la page de connexion."
            >
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

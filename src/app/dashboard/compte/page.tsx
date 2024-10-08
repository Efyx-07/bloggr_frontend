'use client';

import UpdatePasswordForm from '@/components/Forms/User-forms/UpdatePasswordForm';
import FormContainer from '@/components/Forms/FormContainer';
import LoadingPage from '@/components/LoadingPage';
import usePageLoader from '@/hooks/usePageLoader';

export default function AccountSettings() {
  // Utilise le hook pour le chargement de la page
  // ===========================================================================================
  const isContentVisible  = usePageLoader();
  // ===========================================================================================

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

'use client';

import { WithPageLoader } from '@/hoc/WithPageLoader';
import UpdatePasswordForm from '@/components/Forms/User-forms/UpdatePasswordForm';
import FormContainer from '@/components/Forms/FormContainer';

export default function AccountSettings() {
  return (
    <>
      <WithPageLoader loadingPageMention="Accès aux paramètres du compte...">
        <div className="page page_with-form">
          <div className="content">
            <FormContainer
              title="Modifier votre mot de passe"
              additionalMention="Note: à la modification du mot de passe, vous serez redirigé vers la page de connexion."
            >
              <UpdatePasswordForm />
            </FormContainer>
          </div>
        </div>
      </WithPageLoader>
    </>
  );
}

'use client';

import LoginForm from '@/components/Forms/User-forms/LoginForm';
import FormContainer from '@/components/Forms/FormContainer';
import { WithPageLoader } from '@/hoc/WithPageLoader';
import { AuthGuard } from '@/hoc/AuthGuard';

export default function LoginPage() {
  return (
    <>
      <AuthGuard redirectPath="/dashboard/articles" shouldBeLoggedIn={false}>
        <WithPageLoader loadingPageMention="Accès à la page d'accueil...">
          <div className="page page_with-form">
            <div className="content">
              <FormContainer title="Connexion">
                <LoginForm />
              </FormContainer>
            </div>
          </div>
        </WithPageLoader>
      </AuthGuard>
    </>
  );
}

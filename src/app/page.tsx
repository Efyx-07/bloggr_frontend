'use client';

import LoginForm from '@/components/Forms/User-forms/LoginForm';
import FormContainer from '@/components/Forms/FormContainer';
import { WithPageLoader } from '@/hoc/WithPageLoader';
import { AnimatedPageWrapper } from '@/framer-motion/AnimatedPageWrapper';
import { AuthGuard } from '@/hoc/AuthGuard';

export default function LoginPage() {
  return (
    <>
      <AuthGuard redirectPath="/dashboard/articles" shouldBeLoggedIn={false}>
        <WithPageLoader loadingPageMention="Accès à la page d'accueil...">
          <AnimatedPageWrapper>
            <div className="page">
              <div className="content">
                <FormContainer title="Connexion">
                  <LoginForm />
                </FormContainer>
              </div>
            </div>
          </AnimatedPageWrapper>
        </WithPageLoader>
      </AuthGuard>
    </>
  );
}

'use client';

import '../../styles/page.scss';
import FormContainer from '@/components/FormContainer';
import CreateArticleForm from '@/components/Articles-forms/CreateArticleForm';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';

export default function NewArticlePage() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  setTimeout(() => {
    setIsContentVisible(true);
  }, loadingPageDelay);

  return (
    <>
      {isContentVisible ? (
        <div className="page">
          <div className="content">
            <FormContainer title="Nouvel article">
              <CreateArticleForm />
            </FormContainer>
          </div>
        </div>
      ) : (
        <LoadingPage mention="Accès nouvel article..." />
      )}
    </>
  );
}

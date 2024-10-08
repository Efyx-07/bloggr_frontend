'use client';

import SkeletonArticleForm from '@/components/SkeletonComponents/SkeletonArticleForm';
import LoadingPage from '@/components/LoadingPage';
import { loadingPageDelay } from '@/config';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique des composants
// ================================================================================================
const DynamicFormContainer = dynamic(
  () => import('@/components/Forms/FormContainer'),
  {
    loading: () => <SkeletonArticleForm />,
  },
);
const DynamicCreateArticleForm = dynamic(
  () => import('@/components/Forms/Articles-forms/CreateArticleForm'),
);
// ================================================================================================

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
            <DynamicFormContainer title="Nouvel article">
              <DynamicCreateArticleForm />
            </DynamicFormContainer>
          </div>
        </div>
      ) : (
        <LoadingPage mention="Accès nouvel article..." />
      )}
    </>
  );
}

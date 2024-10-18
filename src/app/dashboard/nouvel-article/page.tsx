'use client';

import SkeletonArticleForm from '@/components/SkeletonComponents/SkeletonArticleForm';
import { WithPageLoader } from '@/hoc/WithPageLoader';
import { AnimatedPageWrapper } from '@/framer-motion/AnimatedPageWrapper';
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
  return (
    <>
      <WithPageLoader loadingPageMention="Accès nouvel article...">
        <AnimatedPageWrapper>
          <div className="page">
            <div className="content">
              <DynamicFormContainer title="Nouvel article">
                <DynamicCreateArticleForm />
              </DynamicFormContainer>
            </div>
          </div>
        </AnimatedPageWrapper>
      </WithPageLoader>
    </>
  );
}

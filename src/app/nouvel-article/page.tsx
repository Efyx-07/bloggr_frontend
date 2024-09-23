import '../../styles/page.scss';
import MainLayout from '../_layouts/MainLayout';
import FormContainer from '@/components/FormContainer';
import CreateArticleForm from '@/components/Articles-forms/CreateArticleForm';

export default function NewArticlePage() {
  return (
    <>
      <MainLayout>
        <div className="page">
          <div className="content">
            <FormContainer title="Nouvel article">
              <CreateArticleForm />
            </FormContainer>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

import '../../styles/page.scss';
import FormContainer from '@/components/FormContainer';
import CreateArticleForm from '@/components/Articles-forms/CreateArticleForm';

export default function NewArticlePage() {
  return (
    <div className="page">
      <div className="content">
        <FormContainer title="Nouvel article">
          <CreateArticleForm />
        </FormContainer>
      </div>
    </div>
  );
}

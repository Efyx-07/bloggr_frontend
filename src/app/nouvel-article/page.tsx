import MainLayout from '../_layouts/MainLayout';
import CreateArticleForm from '@/components/Articles-forms/CreateArticleForm';

export default function NewArticlePage() {
  return (
    <>
      <MainLayout>
        <div className="page">
          <div className="content">
            <h1>Nouvel article</h1>
            <CreateArticleForm />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

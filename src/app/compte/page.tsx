import '../../styles/page.scss';
import MainLayout from '../_layouts/MainLayout';
import UpdatePasswordForm from '@/components/User-forms/UpdatePasswordForm';
import FormContainer from '@/components/FormContainer';

export default function AccountSettings() {
  return (
    <MainLayout>
      <div className="page">
        <div className="content">
          <FormContainer title="Modifier votre mot de passe">
            <UpdatePasswordForm />
          </FormContainer>
        </div>
      </div>
    </MainLayout>
  );
}

import '../../styles/page.scss';
import UpdatePasswordForm from '@/components/User-forms/UpdatePasswordForm';
import FormContainer from '@/components/FormContainer';

export default function AccountSettings() {
  return (
    <div className="page">
      <div className="content">
        <FormContainer title="Modifier votre mot de passe">
          <UpdatePasswordForm />
        </FormContainer>
      </div>
    </div>
  );
}

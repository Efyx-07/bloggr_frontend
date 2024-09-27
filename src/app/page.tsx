import '../styles/page.scss';
import LoginForm from '@/components/User-forms/LoginForm';
import FormContainer from '@/components/FormContainer';

export default function LoginPage() {
  return (
    <div className="page">
      <div className="content">
        <FormContainer title="Connexion">
          <LoginForm />
        </FormContainer>
      </div>
    </div>
  );
}

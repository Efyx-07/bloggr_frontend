import LoginForm from '@/components/Forms/LoginForm';
import '../assets/sass/page.scss';

export default function LoginPage() {
  return (
    <div className="page">
      <div className="content">
        <h1>Login Page</h1>
        <LoginForm />
      </div>
    </div>
  );
}

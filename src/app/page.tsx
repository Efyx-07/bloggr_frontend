import LoginForm from '@/components/forms/LoginForm';
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

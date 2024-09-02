import MainLayout from '../_layouts/MainLayout';
import UpdatePasswordForm from '@/components/User-forms/UpdatePasswordForm';

export default function AccountSettings() {
  return (
    <MainLayout>
      <div className="page">
        <div className="content">
          <h1>Compte</h1>
          <UpdatePasswordForm />
        </div>
      </div>
    </MainLayout>
  );
}

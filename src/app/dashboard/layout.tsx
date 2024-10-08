import { AuthGuard } from '@/auth-guards';
import ModalPublishArticle from '@/components/Modals/ModalPublishArticle';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard redirectPath="/" shouldBeLoggedIn={true}>
        {children}
        <ModalPublishArticle />
      </AuthGuard>
    </>
  );
}

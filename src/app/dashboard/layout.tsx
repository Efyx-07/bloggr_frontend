import { AuthGuard } from '@/auth-guards';
import ModalPublishArticle from '@/components/ModalPublishArticle';

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

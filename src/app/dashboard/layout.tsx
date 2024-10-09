import { AuthGuard } from '@/auth-guards';
import ModalPublishArticle from '@/components/Modals/ModalPublishArticle';
import BurgerMenu from '@/components/Modals/BurgerMenu/BurgerMenu';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard redirectPath="/" shouldBeLoggedIn={true}>
        {children}
        <BurgerMenu />
        <ModalPublishArticle />
      </AuthGuard>
    </>
  );
}

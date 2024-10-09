import { AuthGuard } from '@/auth-guards';
import ModalPublishArticle from '@/components/Modals/ModalPublishArticle';
import BurgerMenu from '@/components/Modals/BurgerMenu/BurgerMenu';
import ModalOverlay from '@/components/Modals/ModalOverlay';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard redirectPath="/" shouldBeLoggedIn={true}>
        {children}
        <ModalOverlay />
        <BurgerMenu />
        <ModalPublishArticle />
      </AuthGuard>
    </>
  );
}

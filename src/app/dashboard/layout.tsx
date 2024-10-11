import { AuthGuard } from '@/hoc/AuthGuard';
import ModalPublishArticle from '@/components/Modals/ModalPublishArticle';
import ModalDeleteArticle from '@/components/Modals/ModalDeleteArticle';
import BurgerMenu from '@/components/Modals/BurgerMenu';
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
        <ModalDeleteArticle />
      </AuthGuard>
    </>
  );
}

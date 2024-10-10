import { Icon } from '@iconify/react';
import useModalStore from '@/stores/modalStore';

export default function MobileMenuIcon() {
  const { openBurgerMenu } = useModalStore();
  return (
    <>
      <Icon
        icon="material-symbols:menu"
        onClick={openBurgerMenu}
        className="text-3xl text-black hover:text-accent cursor-pointer"
      />
    </>
  );
}

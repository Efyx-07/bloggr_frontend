import { Icon } from '@iconify/react';

interface MobileMenuIconProps {
  toggleMenu: () => void;
}

export default function MobileMenuIcon({ toggleMenu }: MobileMenuIconProps) {
  return (
    <>
      <Icon
        icon="material-symbols:menu"
        onClick={toggleMenu}
        className="text-3xl text-accent hover:text-black cursor-pointer"
      />
    </>
  );
}

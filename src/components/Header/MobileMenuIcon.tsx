import './MobileMenuIcon.scss';
import { Icon } from '@iconify/react';

interface MobileMenuIconProps {
  toggleMenu: () => void;
  scrolled: boolean;
}

export default function MobileMenuIcon({
  toggleMenu,
  scrolled,
}: MobileMenuIconProps) {
  return (
    <div className="mobile-icon-container" onClick={toggleMenu}>
      <Icon
        icon="tabler:menu-3"
        className={` mobile-icon ${scrolled ? 'scrolled' : ''}`}
      />
    </div>
  );
}

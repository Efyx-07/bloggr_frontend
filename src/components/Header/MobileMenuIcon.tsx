import './MobileMenuIcon.scss';
import { Icon } from '@iconify/react';

interface MobileMenuIconProps {
  toggleMenu: () => void;
}

export default function MobileMenuIcon({ toggleMenu }: MobileMenuIconProps) {
  return (
    <div className="mobile-icon-container" onClick={toggleMenu}>
      <Icon icon="tabler:menu-3" className="mobile-icon" />
    </div>
  );
}

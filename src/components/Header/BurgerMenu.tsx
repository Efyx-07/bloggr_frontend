import './BurgerMenu.scss';
import { Icon } from '@iconify/react';
import Navigator from './Navigator';
import ModalLogout from '../ModalLogout';

interface BurgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function BurgerMenu({ isOpen, toggleMenu }: BurgerMenuProps) {
  return (
    <div className={`burger-menu ${!isOpen ? 'hidden' : ''}`}>
      <div className="burger-menu-head">
        <div className="close-icon-container">
          <Icon icon="ei:close" className="close-icon" onClick={toggleMenu} />
        </div>
      </div>
      <Navigator toggleMenu={toggleMenu} />
      <ModalLogout />
    </div>
  );
}

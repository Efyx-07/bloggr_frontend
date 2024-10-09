import { Icon } from '@iconify/react';
import Navigator from './Navigator';
import ModalLogout from '../../Modals/ModalLogout';
import { useState } from 'react';
import './BurgerMenu.css';

interface BurgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function BurgerMenu({ isOpen, toggleMenu }: BurgerMenuProps) {
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false);

  return (
    <div
      className={`
        burger-menu
        transition-transform duration-200 ease
        ${!isOpen ? 'translate-x-full' : 'translate-x-0'}`}
    >
      <div className="flex justify-end">
        <div onClick={toggleMenu} className="close-icon-container">
          <Icon
            icon="weui:close-outlined"
            className="close-icon text-2xl text-accent"
          />
        </div>
      </div>
      <Navigator
        toggleMenu={toggleMenu}
        toggleModal={() => setIsModalLogoutOpen(!isModalLogoutOpen)}
      />
      <ModalLogout
        isModalLogoutOpen={isModalLogoutOpen}
        toggleModal={() => setIsModalLogoutOpen(!isModalLogoutOpen)}
        toggleMenu={toggleMenu}
      />
    </div>
  );
}

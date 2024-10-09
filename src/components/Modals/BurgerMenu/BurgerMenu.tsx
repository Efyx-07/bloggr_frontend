'use client';

import { Icon } from '@iconify/react';
import ModalCloseIcon from '../ModalComponents/ModalCloseIcon';
import Navigator from './Navigator';
import ModalLogout from '../ModalLogout';
import useModalStore from '@/stores/modalStore';
import { useState } from 'react';
import './BurgerMenu.css';

export default function BurgerMenu() {
  const { isBurgerMenuOpen, closeBurgerMenu } = useModalStore();
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false);

  return (
    <div
      className={`
        burger-menu
        transition-transform duration-200 ease
        ${!isBurgerMenuOpen ? 'translate-x-full' : 'translate-x-0'}`}
    >
      <ModalCloseIcon onClick={closeBurgerMenu}/>
      <Navigator
        closeBurgerMenu={closeBurgerMenu}
        toggleModal={() => setIsModalLogoutOpen(!isModalLogoutOpen)}
      />
      <ModalLogout
        isModalLogoutOpen={isModalLogoutOpen}
        toggleModal={() => setIsModalLogoutOpen(!isModalLogoutOpen)}
        closeBurgerMenu={closeBurgerMenu}
      />
    </div>
  );
}

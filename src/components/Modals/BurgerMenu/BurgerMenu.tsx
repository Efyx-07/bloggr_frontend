'use client';

import { Icon } from '@iconify/react';
import Navigator from './Navigator';
import ModalLogout from '../ModalLogout';
import useModalStore from '@/stores/modalStore';
import { useState } from 'react';
import './BurgerMenu.css';

export default function BurgerMenu() {
const {isBurgerMenuOpen, closeBurgerMenu} = useModalStore();
const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false);

  return (
    <div
      className={`
        burger-menu
        transition-transform duration-200 ease
        ${!isBurgerMenuOpen ? 'translate-x-full' : 'translate-x-0'}`}
    >
      <div className="flex justify-end">
        <div onClick={closeBurgerMenu} className="close-icon-container">
          <Icon
            icon="weui:close-outlined"
            className="close-icon text-2xl text-accent"
          />
        </div>
      </div>
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

import { Icon } from '@iconify/react';
import Navigator from './Navigator';
import ModalLogout from '../ModalLogout';
import { useState } from 'react';

interface BurgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function BurgerMenu({ isOpen, toggleMenu }: BurgerMenuProps) {
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false);

  return (
    <div
      className={`
        fixed top-0 right-0 z-50
        w-full sm:max-w-[50vw] lgInter:max-w-[25vw] 
        h-[100dvh]
        pt-[1rem] pr-[1rem] pb-[2rem] pl-[2rem]
        bg-white custom-shadow 
        grid grid-rows-3 gap-8
        transition-transform duration-200 ease
        ${!isOpen ? 'translate-x-full' : 'translate-x-0'}`}
    >
      <div className="flex justify-end">
        <div
          onClick={toggleMenu}
          className="
            parent
            w-[2rem] h-[2rem]
            border border-accent border-solid
            rounded-full
            flex justify-center items-center
            cursor-pointer
            hover:border-black
          "
        >
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

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteName from './SiteName/SiteName';
import MobileMenuIcon from './BurgerMenu/MobileMenuIcon';
import MessageIcon from './MessageWindow/MessageIcon';
import BurgerMenu from './BurgerMenu/BurgerMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName: string = usePathname();

  return (
    <>
      <header
        className="
          w-full h-20 bg-white 
          flex justify-center items-center 
          sticky top-0 z-50
          "
      >
        <div
          className={`
            w-full max-w-[90rem] 
            px-4 lgInter:px-8 
            flex items-center
            ${pathName === '/' ? 'justify-center' : 'justify-between'}
          `}
        >
          <SiteName />
          {/* Cache l'icone du menu sur la page de connexion */}
          {pathName !== '/' && (
            <div className="flex items-center gap-8">
              <MessageIcon />
              <MobileMenuIcon toggleMenu={() => setIsOpen(!isOpen)} />
            </div>
          )}
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
    </>
  );
}

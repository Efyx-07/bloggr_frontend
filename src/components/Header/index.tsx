'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteName from './SiteName';
import MobileMenuIcon from './MobileMenuIcon';
import BurgerMenu from './BurgerMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName: string = usePathname();

  return (
    <>
      <header className="w-full h-[5rem] bg-white flex justify-center items-center">
        <div
          className={`w-full max-w-[90rem] px-[1rem] flex items-center 
            ${pathName === '/' ? 'justify-center' : 'justify-between'} lgInter:px-[2rem]`}
        >
          <SiteName />
          {/* Cache l'icone du menu sur la page de connexion */}
          {pathName !== '/' && (
            <MobileMenuIcon toggleMenu={() => setIsOpen(!isOpen)} />
          )}
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
    </>
  );
}

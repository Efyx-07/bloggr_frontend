'use client';

import './Header.scss';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteName from '../Sharables/Others/SiteName';
import MobileMenuIcon from './MobileMenuIcon';
import BurgerMenu from './BurgerMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName: string = usePathname();

  return (
    <>
      <header>
        <div className="content">
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

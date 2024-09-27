'use client';

import './Header.scss';
import { useState } from 'react';
import SiteName from '../Sharables/Others/SiteName';
import MobileMenuIcon from './MobileMenuIcon';
import BurgerMenu from './BurgerMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header>
        <div className="content">
          <SiteName />
          <MobileMenuIcon toggleMenu={() => setIsOpen(!isOpen)} />
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
    </>
  );
}

'use client';

import './Header.scss';
import { useState } from 'react';
import { Chivo } from 'next/font/google';
import MobileMenuIcon from './MobileMenuIcon';
import BurgerMenu from './BurgerMenu';

const font = Chivo({
  weight: '400',
  subsets: ['latin'],
});

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const siteName = '.Bloggr';

  return (
    <>
      <header>
        <div className="content">
          <h1 className={`${font.className} site-name`}>{siteName}</h1>
          <MobileMenuIcon toggleMenu={() => setIsOpen(!isOpen)} />
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
    </>
  );
}

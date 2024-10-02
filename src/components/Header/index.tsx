'use client';

import './Header.scss';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteName from '../Sharables/Others/SiteName';
import MobileMenuIcon from './MobileMenuIcon';
import BurgerMenu from './BurgerMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathName: string = usePathname();

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div
          className={`content ${pathName === '/' ? 'on-login-content' : ''}`}
        >
          <SiteName />
          {/* Cache l'icone du menu sur la page de connexion */}
          {pathName !== '/' && (
            <MobileMenuIcon
              toggleMenu={() => setIsOpen(!isOpen)}
              scrolled={scrolled}
            />
          )}
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
    </>
  );
}

'use client';

import './Header.scss';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteName from '../Sharables/Others/SiteName';
import MobileMenuIcon from './MobileMenuIcon';
import BurgerMenu from './BurgerMenu';

import useAdminStore from '@/stores/adminStore';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName: string = usePathname();
  const [isLoggedStatus, setIsLoggedStatus] = useState('false');

  const { isLogged, checkIsLoggedStatus } = useAdminStore();

  useEffect(() => {
    const isLoggedFromLocalStorage = checkIsLoggedStatus();
    setIsLoggedStatus(isLoggedFromLocalStorage ? 'true' : 'false');
  }, [isLogged, checkIsLoggedStatus]);

  return (
    <>
      <header>
        <div
          className={`content ${pathName === '/' ? 'on-login-content' : ''}`}
        >
          <SiteName />
          {/* Cache l'icone du menu sur la page de connexion */}
          {pathName !== '/' && (
            <MobileMenuIcon toggleMenu={() => setIsOpen(!isOpen)} />
          )}
          <p style={{ color: 'white' }}>isLogged: {isLoggedStatus}</p>
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
    </>
  );
}

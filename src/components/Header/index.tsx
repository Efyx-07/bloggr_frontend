'use client';

import { usePathname } from 'next/navigation';
import SiteName from './SiteName/SiteName';
import MobileMenuIcon from '../Modals/BurgerMenu/MobileMenuIcon';

export default function Header() {
  const pathName: string = usePathname();

  return (
    <>
      <header
        className="
          w-full h-20 bg-white 
          flex justify-center items-center 
          sticky top-0 z-30
          "
      >
        <div
          className={`
            w-full max-w-[90rem] 
            px-4 lg:px-8 
            flex items-center
            ${pathName === '/' ? 'justify-center' : 'justify-between'}
          `}
        >
          <SiteName />
          {/* Cache l'icone du menu sur la page de connexion */}
          {pathName !== '/' && <MobileMenuIcon />}
        </div>
      </header>
    </>
  );
}

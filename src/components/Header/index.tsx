'use client';

import { usePathname } from 'next/navigation';
import SiteName from './SiteName/SiteName';
import MobileMenuIcon from './MobileMenuIcon';
import VerticalSeparator from '../Sharables/Others/VerticalSeparator';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function Header() {
  const pathName: string = usePathname();

  return (
    <>
      <header
        className="w-full h-16 bg-whiteBackground border-b border-black10 
        flex justify-center items-center sticky top-0 z-30"
      >
        <div
          className={`w-full max-w-[90rem] h-8 px-4 lg:px-8 flex items-center
            ${pathName === '/' ? 'justify-center' : 'justify-between'}
          `}
        >
          <div className="h-full flex items-center gap-8">
            <SiteName />
            {/* Ajoute un onglet de navigation sur la page individuelle article */}
            {pathName.startsWith('/dashboard/article/') && <OptionalNavitem />}
          </div>
          {/* Cache l'icone du menu sur la page de connexion */}
          {pathName !== '/' && <MobileMenuIcon />}
        </div>
      </header>
    </>
  );
}

function OptionalNavitem() {
  return (
    <div className="invisible sm:visible h-full flex items-center gap-8">
      <VerticalSeparator />
      <Link
        href="/dashboard/articles"
        className="text-accent hover:text-black font-semibold flex items-center gap-2"
      >
        <Icon icon="fluent:ios-arrow-24-filled" />
        <p>retour à mes articles</p>
      </Link>
    </div>
  );
}

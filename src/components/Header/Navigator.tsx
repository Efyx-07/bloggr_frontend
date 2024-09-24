import './Navigator.scss';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';

interface NavigatorProps {
  toggleMenu: () => void;
}

export default function Navigator({ toggleMenu }: NavigatorProps) {
  const router = useRouter();
  const logoutAdmin = useLogoutAdmin();

  interface Navitem {
    name: string;
    onClick: MouseEventHandler<HTMLDivElement>;
  }

  // Liste les items
  // ===========================================================================================
  const navitems: Navitem[] = [
    {
      name: 'Mes articles',
      onClick: () => {
        router.push('/articles');
        toggleMenu();
      },
    },
    {
      name: 'Nouvel article',
      onClick: () => {
        router.push('/nouvel-article');
        toggleMenu();
      },
    },
    {
      name: 'Compte',
      onClick: () => {
        router.push('/compte');
        toggleMenu();
      },
    },
    {
      name: 'Me déconnecter',
      onClick: logoutAdmin,
    },
  ];
  return (
    <nav>
      {navitems.map((navItem) => (
        <div className="nav-item" key={navItem.name} onClick={navItem.onClick}>
          {navItem.name}
        </div>
      ))}
    </nav>
  );
}

import './Navigator.scss';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

interface NavigatorProps {
  toggleMenu: () => void;
  toggleModal: () => void;
}

export default function Navigator({ toggleMenu, toggleModal }: NavigatorProps) {
  const router = useRouter();

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
        router.push('/dashboard/articles');
        toggleMenu();
      },
    },
    {
      name: 'Nouvel article',
      onClick: () => {
        router.push('/dashboard/nouvel-article');
        toggleMenu();
      },
    },
    {
      name: 'Compte',
      onClick: () => {
        router.push('/dashboard/compte');
        toggleMenu();
      },
    },
    {
      name: 'Me déconnecter',
      onClick: toggleModal,
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

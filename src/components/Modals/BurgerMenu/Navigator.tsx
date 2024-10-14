import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

interface NavigatorProps {
  closeBurgerMenu: () => void;
  toggleModal: () => void;
}

export default function Navigator({
  closeBurgerMenu,
  toggleModal,
}: NavigatorProps) {
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
        closeBurgerMenu();
      },
    },
    {
      name: 'Nouvel article',
      onClick: () => {
        router.push('/dashboard/nouvel-article');
        closeBurgerMenu();
      },
    },
    {
      name: 'Compte',
      onClick: () => {
        router.push('/dashboard/compte');
        closeBurgerMenu();
      },
    },
    {
      name: 'Me déconnecter',
      onClick: toggleModal,
    },
  ];
  return (
    <nav className="flex flex-col gap-8">
      {navitems.map((navItem) => (
        <div
          key={navItem.name}
          onClick={navItem.onClick}
          className="text-black text-2xl font-semibold hover:text-accent cursor-pointer"
        >
          {navItem.name}
        </div>
      ))}
    </nav>
  );
}

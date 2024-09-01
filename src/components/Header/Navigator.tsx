import './Navigator.scss';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';

export default function Navigator() {
  const router = useRouter();

  const logoutAdmin = useLogoutAdmin();

  interface Navitem {
    name: string;
    onClick: MouseEventHandler<HTMLDivElement>;
  }

  const navitems: Navitem[] = [
    {
      name: 'Mes articles',
      onClick: () => router.push('/articles'),
    },
    {
      name: 'Nouvel article',
      onClick: () => router.push('/nouvel-article'),
    },
    {
      name: 'Compte',
      onClick: () => router.push('/compte'),
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

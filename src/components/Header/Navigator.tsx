import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';
import './Navigator.scss';

export default function Navigator() {
  const router = useRouter();
  const adminStore = useAdminStore();

  const logoutAdmin = (): void => {
    adminStore.logoutAdmin();
    router.push('/');
  };

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

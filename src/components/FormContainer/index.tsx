'use client';

import './FormContainer.scss';
import HeadTitle from '../Sharables/Others/HeadTitle';
import { usePathname } from 'next/navigation';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function FormContainer({ title, children }: FormContainerProps) {
  const pathName = usePathname();
  const loginPathname = pathName === '/';
  const comptePathname = pathName === '/compte';
  return (
    <div
      className={`form-container ${loginPathname || comptePathname ? 'user-form-container' : ''}`}
    >
      <HeadTitle title={title} />
      {children}
    </div>
  );
}

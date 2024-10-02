'use client';

import './FormContainer.scss';
import HeadTitle from '../Sharables/Others/HeadTitle';
import { usePathname } from 'next/navigation';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  additionalMention?: string;
}

export default function FormContainer({
  title,
  children,
  additionalMention,
}: FormContainerProps) {
  const pathName = usePathname();
  const loginPathname = pathName === '/';
  const comptePathname = pathName === '/dashboard/compte';
  return (
    <div
      className={`form-container ${loginPathname || comptePathname ? 'user-form-container' : ''}`}
    >
      <HeadTitle title={title} />
      {additionalMention && (
        <p className="additional-mention">{additionalMention}</p>
      )}
      {children}
    </div>
  );
}

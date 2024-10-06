'use client';

import HeadTitle from '../Sharables/Others/HeadTitle';
import { usePathname } from 'next/navigation';
import './FormContainer.css';

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
      className={`
        form-container
        ${loginPathname || comptePathname ? 'max-w-[30rem]' : 'max-w-[50rem]'}
      `}
    >
      <HeadTitle title={title} />
      {additionalMention && (
        <p className="additional-mention">{additionalMention}</p>
      )}
      {children}
    </div>
  );
}

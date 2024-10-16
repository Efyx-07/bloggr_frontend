'use client';

import HeadTitle from '@/components/Sharables/Others/HeadTitle';
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
      className={`container-style w-full p-4 md:p-8 gap-8
        ${loginPathname || comptePathname ? 'max-w-smallForm' : 'max-w-largeForm'}
      `}
    >
      <HeadTitle title={title} />
      {additionalMention && (
        <p className="w-full p-4 border border-black border-solid text-xs font-semibold">
          {additionalMention}
        </p>
      )}
      {children}
    </div>
  );
}

'use client';

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
      className={`
        w-full
        p-[1rem] smInter:p-[2rem]
        bg-white
        border rounded-lg
        flex flex-col gap-8
        ${loginPathname || comptePathname ? 'max-w-[30rem]' : 'max-w-[50rem]'}
      `}
    >
      <HeadTitle title={title} />
      {additionalMention && (
        <p
          className="
            w-full 
            p-[1rem]
            border border-black border-solid 
            text-xs 
            font-semibold
          "
        >
          {additionalMention}
        </p>
      )}
      {children}
    </div>
  );
}

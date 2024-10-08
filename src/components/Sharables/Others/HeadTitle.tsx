import Separator from './Separator';
import { usePathname } from 'next/navigation';

interface HeadTitleProps {
  title: string;
  children?: React.ReactNode;
}

export default function HeadTitle({ title, children }: HeadTitleProps) {
  const pathName = usePathname();
  const articlesPath = pathName === '/dashboard/articles';
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className={`flex ${articlesPath ? 'flex-col-reverse' : 'flex-col '} gap-2
          s:flex-row s:justify-between s:items-center`}
      >
        <h2 className="whitespace-nowrap">{title}</h2>
        {children}
      </div>
      <Separator />
    </div>
  );
}

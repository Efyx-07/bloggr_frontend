import Separator from './Separator';

interface HeadTitleProps {
  title: string;
  children?: React.ReactNode;
}

export default function HeadTitle({ title, children }: HeadTitleProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col  gap-2 sm:flex-row sm:justify-between sm:items-center">
        <h2>{title}</h2>
        {children}
      </div>
      <Separator />
    </div>
  );
}

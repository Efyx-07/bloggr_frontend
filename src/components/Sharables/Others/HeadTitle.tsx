import Separator from './Separator';

interface HeadTitleProps {
  title: string;
  children?: React.ReactNode;
}

export default function HeadTitle({ title, children }: HeadTitleProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="whitespace-nowrap">{title}</h2>
        {children}
      </div>
      <Separator />
    </div>
  );
}

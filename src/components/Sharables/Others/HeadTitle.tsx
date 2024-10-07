import Separator from './Separator';

interface HeadTitleProps {
  title: string;
  children?: React.ReactNode;
}

export default function HeadTitle({ title, children }: HeadTitleProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div 
        className="
          flex flex-col gap-2
          s:flex-row s:justify-between s:items-center
        "
      >
        <h2 className="whitespace-nowrap">{title}</h2>
        {children}
      </div>
      <Separator />
    </div>
  );
}

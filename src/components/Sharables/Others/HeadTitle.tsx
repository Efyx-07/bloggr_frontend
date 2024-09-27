import './HeadTitle.scss';
import Separator from './Separator';

interface HeadTitleProps {
  title: string;
  children?: React.ReactNode;
}

export default function HeadTitle({ title, children }: HeadTitleProps) {
  return (
    <div className="head-title">
      <div className="title-children-container">
        <h2>{title}</h2>
        {children}
      </div>
      <Separator />
    </div>
  );
}

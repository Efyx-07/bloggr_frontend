import './HeadTitle.scss';
import Separator from './Separator';

interface HeadTitleProps {
  title: string;
}

export default function HeadTitle({ title }: HeadTitleProps) {
  return (
    <div className="head-title">
      <h2>{title}</h2>
      <Separator />
    </div>
  );
}

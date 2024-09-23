import { MouseEventHandler } from 'react';
import './PrimaryButton.scss';

interface SecondaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function SecondaryButton({
  type,
  name,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button className="form-button secondary" type={type} onClick={onClick}>
      {name}
    </button>
  );
}

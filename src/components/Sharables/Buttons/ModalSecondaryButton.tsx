import { MouseEventHandler } from 'react';
import './MainButton.scss';

interface ModalSecondaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ModalSecondaryButton({
  type,
  name,
  onClick,
}: ModalSecondaryButtonProps) {
  return (
    <button className="modal-button secondary" type={type} onClick={onClick}>
      {name}
    </button>
  );
}

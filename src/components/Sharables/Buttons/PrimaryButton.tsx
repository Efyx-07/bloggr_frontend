import './FormButton.scss';
import { useState } from 'react';

interface PrimaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function PrimaryButton({
  type,
  name,
  onClick,
}: PrimaryButtonProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  // Modifie l'événement onClick pour gérer à la fois le clic interne et externe
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);

    // Appelle la fonction onClick passée en prop si elle existe
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <button
      className={`form-button primary ${clicked ? 'clicked' : ''}`}
      type={type}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

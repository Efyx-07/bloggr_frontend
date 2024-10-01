import './FormButton.scss';
import { useState } from 'react';
import ButtonLoadingSpinner from '../Spinners/ButtonLoadingSpinner';

interface PrimaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isClicked?: boolean;
}

export default function PrimaryButton({
  type,
  name,
  onClick,
  isClicked,
  isLoading,
}: PrimaryButtonProps) {
  /*const [isClicked, setIsClicked] = useState<boolean>(false);

  // Modifie l'événement onClick pour gérer à la fois le clic interne et externe
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);

    // Appelle la fonction onClick passée en prop si elle existe
    if (onClick) {
      onClick(event);
    }
  };*/

  return (
    <button
      className={`form-button primary ${isClicked ? 'clicked' : ''}`}
      type={type}
      //onClick={handleClick}
    >
      {isLoading ? <ButtonLoadingSpinner /> : <p>{name}</p>}
    </button>
  );
}

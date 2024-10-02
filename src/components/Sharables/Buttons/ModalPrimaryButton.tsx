import ButtonLoadingSpinner from '../Spinners/ButtonLoadingSpinner';
import './MainButton.scss';

interface ModalPrimaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isClicked?: boolean;
}

export default function ModalPrimaryButton({
  type,
  name,
  onClick,
  isClicked,
  isLoading,
}: ModalPrimaryButtonProps) {
  return (
    <button
      className={`modal-button primary ${isClicked ? 'clicked' : ''}`}
      type={type}
      onClick={onClick}
    >
      {isLoading ? <ButtonLoadingSpinner /> : <p>{name}</p>}
    </button>
  );
}

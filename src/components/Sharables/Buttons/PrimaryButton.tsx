import './MainButton.scss';
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
  return (
    <button
      className={`form-button primary ${isClicked ? 'clicked' : ''}`}
      type={type}
      onClick={onClick}
    >
      {isLoading ? <ButtonLoadingSpinner /> : <p>{name}</p>}
    </button>
  );
}

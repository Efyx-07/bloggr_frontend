import ButtonLoadingSpinner from '../Spinners/ButtonLoadingSpinner';
import './Button.css';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  addedClassName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  primary?: boolean;
  isLoading?: boolean;
  isClicked?: boolean;
}

export default function Button({
  type,
  name,
  addedClassName,
  onClick,
  primary,
  isClicked,
  isLoading,
}: ButtonProps) {
  return (
    <button
      className={`custom-button ${addedClassName} ${isClicked ? 'clicked' : ''}`}
      type={type}
      onClick={onClick}
    >
      {primary && isLoading ? <ButtonLoadingSpinner /> : <p>{name}</p>}
    </button>
  );
}

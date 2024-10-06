import CardButtonLoadingSpinner from '../Spinners/CardButtonLoadingSpinner';
import './SmallButton.css';

interface SmallButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  addedClassName?: string;
  label: string;
  isLoading?: boolean;
}

export default function SmallButton({
  onClick,
  addedClassName,
  label,
  isLoading,
}: SmallButtonProps) {
  return (
    <button className={`small-button ${addedClassName}`} onClick={onClick}>
      {isLoading ? <CardButtonLoadingSpinner /> : <p>{label}</p>}
    </button>
  );
}

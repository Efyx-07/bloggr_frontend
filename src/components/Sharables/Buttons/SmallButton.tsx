import LoadingSpinner from '../Spinners/LoadingSpinner';
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
    <button
      className={`small-button ${addedClassName} ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
    >
      {isLoading ? <LoadingSpinner className="small-ring" /> : <p>{label}</p>}
    </button>
  );
}

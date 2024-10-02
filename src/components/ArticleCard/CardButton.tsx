import CardButtonLoadingSpinner from '../Sharables/Spinners/CardButtonLoadingSpinner';

interface CardButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  className: string;
  isLoading?: boolean;
}

export default function CardButton({
  onClick,
  label,
  className,
  isLoading,
}: CardButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {isLoading ? <CardButtonLoadingSpinner /> : <p>{label}</p>}
    </button>
  );
}

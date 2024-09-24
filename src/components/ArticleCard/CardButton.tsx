interface CardButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  className: string;
}

export default function CardButton({
  onClick,
  label,
  className,
}: CardButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

import './FormButton.scss';

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
  return (
    <button className="form-button primary" type={type} onClick={onClick}>
      {name}
    </button>
  );
}

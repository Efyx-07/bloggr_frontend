import './FormButton.scss';
import ButtonLoadingSpinner from '../Spinners/ButtonLoadingSpinner';

interface PrimaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

export default function PrimaryButton({
  type,
  name,
  onClick,
  isLoading,
}: PrimaryButtonProps) {
  return (
    <>
      {isLoading ? (
        <button className="form-button primary" type={type} onClick={onClick}>
          <ButtonLoadingSpinner />
        </button>
      ) : (
        <button className="form-button primary" type={type} onClick={onClick}>
          {name}
        </button>
      )}
    </>
  );
}

import './FormButton.scss';

interface PrimaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
}

export default function PrimaryButton({ type, name }: PrimaryButtonProps) {
  return (
    <button className="form-button primary" type={type}>
      {name}
    </button>
  );
}

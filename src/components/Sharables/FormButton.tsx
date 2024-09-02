import './FormButton.scss';

interface FormButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
}

export default function FormButton({ type, name }: FormButtonProps) {
  return (
    <button className="primary-button" type={type}>
      {name}
    </button>
  );
}

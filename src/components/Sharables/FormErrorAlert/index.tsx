import './FormErrorAlert.scss';

interface FormErrorAlertProps {
  errorMention: string;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonMention: string;
}

export default function FormErrorAlert({
  errorMention,
  onButtonClick,
  buttonMention,
}: FormErrorAlertProps) {
  return (
    <div className="error-container">
      <p className="error-mention">{errorMention}</p>
      <button className="error-button" onClick={onButtonClick}>
        {buttonMention}
      </button>
    </div>
  );
}

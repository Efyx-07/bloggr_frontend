import SmallButton from '../Buttons/SmallButton';

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
    <div className="w-full flex justify-end items-center gap-2">
      <p className="text-sm text-errorColor">{errorMention}</p>
      <SmallButton
        addedClassName="limited-width"
        onClick={onButtonClick}
        label={buttonMention}
      />
    </div>
  );
}

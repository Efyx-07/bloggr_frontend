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
      <button
        onClick={onButtonClick}
        className="
          px-2 py-4
          h-[2.25rem]
          bg-transparent
          border border-black25 border-solid rounded
          flex justify-center items-center
          text-sm font-semibold
          cursor-pointer
          hover:bg-accent hover:border-accent hover:text-whiteRelief
        "
      >
        {buttonMention}
      </button>
    </div>
  );
}

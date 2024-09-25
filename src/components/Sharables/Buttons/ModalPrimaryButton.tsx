import './ModalButton.scss';

interface ModalPrimaryButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ModalPrimaryButton({
  type,
  name,
  onClick,
}: ModalPrimaryButtonProps) {
  return (
    <button className="modal-button primary" type={type} onClick={onClick}>
      {name}
    </button>
  );
}

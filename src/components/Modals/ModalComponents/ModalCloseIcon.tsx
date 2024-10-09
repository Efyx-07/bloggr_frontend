import { Icon } from '@iconify/react';

interface ModalCloseIconProps {
  onClick: () => void;
}

export default function ModalCloseIcon({ onClick }: ModalCloseIconProps) {
  return (
    <div className="flex justify-end">
      <Icon
        icon="fa:close"
        onClick={onClick}
        className="text-sm hover:text-accent cursor-pointer"
      />
    </div>
  );
}

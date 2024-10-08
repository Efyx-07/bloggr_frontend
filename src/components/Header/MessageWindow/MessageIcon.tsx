import { Icon } from '@iconify/react';

interface MessageIconProps {
  toggleMessageWindow: () => void;
}
export default function MessageIcon ({toggleMessageWindow}: MessageIconProps) {
  return (
    <div>
      <Icon
        icon="bx:message-square"
        onClick={toggleMessageWindow}
        className="text-3xl text-black hover:text-accent cursor-pointer"
      />
    </div>
  );
}

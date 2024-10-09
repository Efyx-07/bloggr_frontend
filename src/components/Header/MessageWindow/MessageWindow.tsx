import { Icon } from '@iconify/react';
import './MessageWindow.css';

interface MessageWindowProps {
  isMessageWindowOpen: boolean;
  toggleMessageWindow: () => void;
}

export default function MessageWindow({
  isMessageWindowOpen,
  toggleMessageWindow,
}: MessageWindowProps) {
  return (
    <div
      className={`
        message-window
        transition-transform duration-200 ease
        ${!isMessageWindowOpen ? 'translate-x-full' : 'translate-x-0'}`}
    >
      <div className="flex justify-end">
        <div onClick={toggleMessageWindow} className="close-icon-container">
          <Icon
            icon="weui:close-outlined"
            className="close-icon text-2xl text-accent"
          />
        </div>
      </div>
    </div>
  );
}

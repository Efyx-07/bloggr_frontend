import './KeywordsField.scss';
import { Icon } from '@iconify/react';
import { MouseEventHandler } from 'react';

interface KeywordsFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function KeywordsField({
  id,
  label,
  type,
  name,
  value,
  onChange,
  onClick,
}: KeywordsFieldProps) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <div className="input-keyword-container">
        <input
          className="text-input"
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        <div className="icon-container" onClick={onClick}>
          <Icon icon="ic:baseline-plus" className="plus-icon" />
        </div>
      </div>
    </div>
  );
}

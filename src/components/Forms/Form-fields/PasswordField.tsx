import { Icon } from '@iconify/react';
import './field-common-styles.css';

interface PasswordFieldProps {
  id: string;
  label: string;
  requirement?: string;
  type: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: React.MouseEventHandler<HTMLElement>;
  isPasswordVisible: boolean;
}

export default function PasswordField({
  id,
  label,
  requirement,
  type,
  name,
  value,
  required,
  onChange,
  onClick,
  isPasswordVisible,
}: PasswordFieldProps) {
  return (
    <div className="field-container">
      <label htmlFor={id}>{label}</label>
      {requirement && <p className="requirement">{requirement}</p>}
      <div className="input-container">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
        />
        <div onClick={onClick} className="eye-container">
          {isPasswordVisible ? (
            <Icon icon="mdi:eye-off" className="eye-icon" />
          ) : (
            <Icon icon="mdi:eye" className="eye-icon" />
          )}
        </div>
      </div>
    </div>
  );
}

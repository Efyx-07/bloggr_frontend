import './PasswordField.scss';
//import './InputField.scss';
import { Icon } from '@iconify/react';

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
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      {requirement && <p className="requirement">{requirement}</p>}
      <div className="input-password-container">
        <input
          className="text-input"
          id={id}
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
        />
        <div className="eye-container" onClick={onClick}>
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

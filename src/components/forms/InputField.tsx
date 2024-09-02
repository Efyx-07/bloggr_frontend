import { RefObject } from 'react';
import './InputField.scss';

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  value: string | undefined;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  type,
  name,
  label,
  value,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}

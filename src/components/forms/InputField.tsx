import { RefObject } from 'react';
import './InputField.scss';

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  value?: string | undefined;
  id?: string;
  ref?: RefObject<HTMLInputElement>;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  type,
  name,
  label,
  value,
  id,
  ref,
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
        id={id}
        ref={ref}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}

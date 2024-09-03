import './InputField.scss';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  type,
  name,
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

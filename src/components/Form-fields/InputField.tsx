import './InputField.scss';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  label,
  type,
  name,
  value,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}

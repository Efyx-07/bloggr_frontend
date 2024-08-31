import './InputField.scss';

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  label,
  type,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}

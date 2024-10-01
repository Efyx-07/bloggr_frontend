import './InputField.scss';

interface InputFieldProps {
  id: string;
  label: string;
  requirement?: string;
  type: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  label,
  requirement,
  type,
  name,
  value,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      {requirement && <p className="requirement">{requirement}</p>}
      <input
        className="text-input"
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

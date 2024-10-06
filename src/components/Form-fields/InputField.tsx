import './field-common-styles.css';

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
    <div className="field-container">
      <label htmlFor={id}>{label}</label>
      {requirement && <p className="requirement">{requirement}</p>}
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

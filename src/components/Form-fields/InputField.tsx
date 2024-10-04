//import './InputField.scss';

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
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      {requirement && (
        <p className="text-xs font-semibold opacity-75">{requirement}</p>
      )}
      <input
        className="
          w-full h-[3rem] 
          text-base 
          pl-[1rem] 
          border border-black25 focus:border-accent
          outline-none
        "
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
